from __future__ import annotations

from typing import Dict

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from ..core.auth import require_admin
from ..database import get_db
from ..models import Booking, BookingStatus, Hotel
from ..schemas import AnalyticsSummary


router = APIRouter(dependencies=[Depends(require_admin)])


@router.get("/analytics", response_model=AnalyticsSummary)
def analytics(db: Session = Depends(get_db)):
    total_bookings = db.scalar(select(func.count(Booking.id))) or 0

    # Simple popularity mock: count of each accessibility feature among hotels
    feature_popularity: Dict[str, int] = {
        "ramps": db.scalar(select(func.count(Hotel.id)).where(Hotel.has_ramps == True)) or 0,
        "accessible_toilets": db.scalar(select(func.count(Hotel.id)).where(Hotel.has_accessible_toilets == True)) or 0,
        "braille_signage": db.scalar(select(func.count(Hotel.id)).where(Hotel.has_braille_signage == True)) or 0,
        "auditory_cues": db.scalar(select(func.count(Hotel.id)).where(Hotel.has_auditory_cues == True)) or 0,
        "elevators": db.scalar(select(func.count(Hotel.id)).where(Hotel.has_elevators == True)) or 0,
    }

    # Compliance as percentages of hotels having features
    total_hotels = db.scalar(select(func.count(Hotel.id))) or 0
    def pct(count: int) -> float:
        return round((count / total_hotels * 100.0), 2) if total_hotels else 0.0

    hotel_compliance = {k: pct(v) for k, v in feature_popularity.items()}

    return AnalyticsSummary(
        total_bookings=total_bookings,
        feature_popularity=feature_popularity,
        hotel_compliance=hotel_compliance,
    )


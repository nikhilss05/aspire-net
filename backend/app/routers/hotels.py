from __future__ import annotations

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..core.auth import get_current_user, require_admin
from ..database import get_db
from ..models import Hotel, User
from ..schemas import HotelCreate, HotelRead, HotelUpdate


router = APIRouter()


@router.get("/", response_model=List[HotelRead])
def list_hotels(
    has_ramps: Optional[bool] = None,
    has_accessible_toilets: Optional[bool] = None,
    has_braille_signage: Optional[bool] = None,
    has_auditory_cues: Optional[bool] = None,
    has_elevators: Optional[bool] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = select(Hotel)
    # Simple filtering
    if has_ramps is not None:
        query = query.where(Hotel.has_ramps == has_ramps)
    if has_accessible_toilets is not None:
        query = query.where(Hotel.has_accessible_toilets == has_accessible_toilets)
    if has_braille_signage is not None:
        query = query.where(Hotel.has_braille_signage == has_braille_signage)
    if has_auditory_cues is not None:
        query = query.where(Hotel.has_auditory_cues == has_auditory_cues)
    if has_elevators is not None:
        query = query.where(Hotel.has_elevators == has_elevators)

    hotels = db.execute(query).scalars().all()
    return hotels


@router.post("/", response_model=HotelRead, dependencies=[Depends(require_admin)])
def create_hotel(payload: HotelCreate, db: Session = Depends(get_db)):
    hotel = Hotel(**payload.model_dump())
    db.add(hotel)
    db.commit()
    db.refresh(hotel)
    return hotel


@router.put("/{hotel_id}", response_model=HotelRead, dependencies=[Depends(require_admin)])
def update_hotel(hotel_id: int, payload: HotelUpdate, db: Session = Depends(get_db)):
    hotel = db.get(Hotel, hotel_id)
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")
    for key, value in payload.model_dump().items():
        setattr(hotel, key, value)
    db.commit()
    db.refresh(hotel)
    return hotel


@router.delete("/{hotel_id}", dependencies=[Depends(require_admin)])
def delete_hotel(hotel_id: int, db: Session = Depends(get_db)):
    hotel = db.get(Hotel, hotel_id)
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")
    db.delete(hotel)
    db.commit()
    return {"ok": True}


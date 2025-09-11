from __future__ import annotations

from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..core.auth import get_current_user, require_admin
from ..database import get_db
from ..models import Booking, BookingStatus, User
from ..schemas import BookingCreate, BookingRead, BookingStatusUpdate


router = APIRouter()


@router.post("/", response_model=BookingRead)
def create_booking(payload: BookingCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    booking = Booking(
        user_id=current_user.id,
        pickup_location=payload.pickup_location,
        dropoff_location=payload.dropoff_location,
        scheduled_time=payload.scheduled_time,
        vehicle_type=payload.vehicle_type,
        special_requirements=payload.special_requirements,
        status=BookingStatus.pending,
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking


@router.get("/me", response_model=List[BookingRead])
def list_my_bookings(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    bookings = db.execute(select(Booking).where(Booking.user_id == current_user.id).order_by(Booking.scheduled_time.desc())).scalars().all()
    return bookings


@router.get("/all", response_model=List[BookingRead], dependencies=[Depends(require_admin)])
def list_all_bookings(db: Session = Depends(get_db)):
    bookings = db.execute(select(Booking).order_by(Booking.scheduled_time.desc())).scalars().all()
    return bookings


@router.patch("/{booking_id}/status", response_model=BookingRead, dependencies=[Depends(require_admin)])
def update_booking_status(booking_id: int, payload: BookingStatusUpdate, db: Session = Depends(get_db)):
    booking = db.get(Booking, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking.status = payload.status
    db.commit()
    db.refresh(booking)
    return booking


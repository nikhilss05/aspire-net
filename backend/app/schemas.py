from __future__ import annotations

from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel, EmailStr, Field

from .models import DisabilityType, UserRole, VehicleType, BookingStatus


# Auth & User
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    disability_type: Optional[DisabilityType] = None


class UserRead(BaseModel):
    id: int
    email: EmailStr
    disability_type: Optional[DisabilityType] = None
    role: UserRole

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: Optional[int] = None


# Hotels
class HotelBase(BaseModel):
    name: str
    address: str
    has_ramps: bool = False
    has_accessible_toilets: bool = False
    has_braille_signage: bool = False
    has_auditory_cues: bool = False
    has_elevators: bool = False


class HotelCreate(HotelBase):
    pass


class HotelUpdate(HotelBase):
    pass


class HotelRead(HotelBase):
    id: int

    class Config:
        from_attributes = True


# Bookings
class BookingCreate(BaseModel):
    pickup_location: str
    dropoff_location: str
    scheduled_time: datetime
    vehicle_type: VehicleType
    special_requirements: Optional[str] = None


class BookingRead(BaseModel):
    id: int
    user_id: int
    pickup_location: str
    dropoff_location: str
    scheduled_time: datetime
    vehicle_type: VehicleType
    special_requirements: Optional[str]
    status: BookingStatus
    created_at: datetime

    class Config:
        from_attributes = True


class BookingStatusUpdate(BaseModel):
    status: BookingStatus


# Analytics
class AnalyticsSummary(BaseModel):
    total_bookings: int
    feature_popularity: dict
    hotel_compliance: dict


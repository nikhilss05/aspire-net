from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import List, Optional

from sqlalchemy import (
    Boolean,
    DateTime,
    Enum as SAEnum,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base


class UserRole(str, Enum):
    traveler = "traveler"
    admin = "admin"


class DisabilityType(str, Enum):
    blind = "Blind"
    deaf = "Deaf"
    wheelchair = "Wheelchair"
    cognitive = "Cognitive"
    other = "Other"


class VehicleType(str, Enum):
    standard = "Standard"
    wheelchair_van = "Wheelchair Van"
    lift_enabled_taxi = "Lift-Enabled Taxi"


class BookingStatus(str, Enum):
    pending = "pending"
    confirmed = "confirmed"
    completed = "completed"
    cancelled = "cancelled"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    disability_type: Mapped[Optional[DisabilityType]] = mapped_column(SAEnum(DisabilityType), nullable=True)
    role: Mapped[UserRole] = mapped_column(SAEnum(UserRole), default=UserRole.traveler, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    bookings: Mapped[List["Booking"]] = relationship("Booking", back_populates="user", cascade="all, delete-orphan")


class Hotel(Base):
    __tablename__ = "hotels"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    address: Mapped[str] = mapped_column(String(255), nullable=False)

    has_ramps: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    has_accessible_toilets: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    has_braille_signage: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    has_auditory_cues: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    has_elevators: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)


class Booking(Base):
    __tablename__ = "bookings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    pickup_location: Mapped[str] = mapped_column(String(255), nullable=False)
    dropoff_location: Mapped[str] = mapped_column(String(255), nullable=False)
    scheduled_time: Mapped[datetime] = mapped_column(DateTime, nullable=False)

    vehicle_type: Mapped[VehicleType] = mapped_column(SAEnum(VehicleType), nullable=False)
    special_requirements: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    status: Mapped[BookingStatus] = mapped_column(SAEnum(BookingStatus), default=BookingStatus.pending, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    user: Mapped[User] = relationship("User", back_populates="bookings")


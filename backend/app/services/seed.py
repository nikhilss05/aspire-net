from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from ..core.auth import hash_password
from ..models import DisabilityType, Hotel, User, UserRole


def seed_demo_data(db: Session) -> None:
    # Ensure at least one admin exists
    admin = db.execute(select(User).where(User.email == "admin@example.com")).scalar_one_or_none()
    if not admin:
        admin = User(
            email="admin@example.com",
            hashed_password=hash_password("admin123"),
            role=UserRole.admin,
            disability_type=None,
        )
        db.add(admin)

    # Ensure a demo traveler exists
    traveler = db.execute(select(User).where(User.email == "user@example.com")).scalar_one_or_none()
    if not traveler:
        traveler = User(
            email="user@example.com",
            hashed_password=hash_password("user1234"),
            role=UserRole.traveler,
            disability_type=DisabilityType.wheelchair,
        )
        db.add(traveler)

    # Seed hotels
    existing_hotels = db.execute(select(Hotel)).scalars().first()
    if not existing_hotels:
        hotels = [
            Hotel(
                name="Accessible Inn",
                address="123 Main St",
                has_ramps=True,
                has_accessible_toilets=True,
                has_braille_signage=True,
                has_auditory_cues=False,
                has_elevators=True,
            ),
            Hotel(
                name="City Center Hotel",
                address="456 Market Ave",
                has_ramps=True,
                has_accessible_toilets=True,
                has_braille_signage=False,
                has_auditory_cues=True,
                has_elevators=True,
            ),
            Hotel(
                name="Budget Stay",
                address="789 Side Rd",
                has_ramps=False,
                has_accessible_toilets=False,
                has_braille_signage=False,
                has_auditory_cues=False,
                has_elevators=False,
            ),
        ]
        db.add_all(hotels)

    db.commit()


from __future__ import annotations

import argparse
import os

from sqlalchemy import select

import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.core.auth import hash_password
from app.database import Base, SessionLocal, engine
from app.models import User, UserRole


def main() -> None:
    parser = argparse.ArgumentParser(description="Create or update an admin user")
    parser.add_argument("email", nargs="?", default="admin@example.com")
    parser.add_argument("password", nargs="?", default="admin123")
    parser.add_argument("--reset", action="store_true", help="Reset password if user exists")
    args = parser.parse_args()

    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        existing = db.execute(select(User).where(User.email == args.email)).scalar_one_or_none()
        if existing:
            if args.reset:
                existing.hashed_password = hash_password(args.password)
                existing.role = UserRole.admin
                db.commit()
                print(f"Updated admin {args.email}")
            else:
                print(f"User {args.email} already exists. Use --reset to update password.")
        else:
            user = User(email=args.email, hashed_password=hash_password(args.password), role=UserRole.admin)
            db.add(user)
            db.commit()
            print(f"Created admin {args.email}")


if __name__ == "__main__":
    main()


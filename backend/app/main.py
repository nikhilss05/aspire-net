from __future__ import annotations

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import Base, engine, SessionLocal
from .routers import auth as auth_router
from .routers import hotels as hotels_router
from .routers import bookings as bookings_router
from .routers import admin as admin_router
from .services.seed import seed_demo_data


def create_app() -> FastAPI:
    app = FastAPI(title="Accessible Travel API", version="0.1.0")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.on_event("startup")
    def on_startup() -> None:
        Base.metadata.create_all(bind=engine)
        with SessionLocal() as db:  # type: Session
            seed_demo_data(db)

    app.include_router(auth_router.router, prefix="/auth", tags=["auth"])
    app.include_router(hotels_router.router, prefix="/hotels", tags=["hotels"])
    app.include_router(bookings_router.router, prefix="/bookings", tags=["bookings"])
    app.include_router(admin_router.router, prefix="/admin", tags=["admin"])

    @app.get("/")
    def root():
        return {"message": "Travel made accessible for everyone."}

    return app


app = create_app()


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)


"""
FastAPI application entrypoint.

As new capabilities arrive (AI reply suggestions, resume parsing, chatbot…)
each becomes its own router included here — the app stays a thin assembly point.
"""
import logging

from fastapi import FastAPI

from app.core.config import settings
from app.routers import notifications

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s — %(message)s",
)

app = FastAPI(
    title="Portfolio Notification Service",
    description="Internal microservice for email notifications and future AI/ML features.",
    version="1.0.0",
)

# Register feature routers
app.include_router(notifications.router)


@app.get("/health", tags=["health"])
async def health():
    """Liveness probe — used by Docker / load balancers to confirm the service is up."""
    return {"status": "ok", "service": "notification-service", "env": settings.app_env}

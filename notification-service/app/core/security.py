"""
Internal authentication.

The notification service is never exposed to the public internet — only Django
calls it, over the private Docker network. As defense-in-depth we still require
a shared secret header so that even if something on the network reached this
service, it could not trigger emails without the token.
"""
import secrets

from fastapi import Header, HTTPException, status

from app.core.config import settings


async def verify_internal_token(x_internal_token: str = Header(default="")) -> None:
    # secrets.compare_digest avoids timing attacks on the token comparison.
    if not secrets.compare_digest(x_internal_token, settings.internal_api_token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing internal token.",
        )

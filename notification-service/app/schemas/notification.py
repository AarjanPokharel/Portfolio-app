"""
Request/response schemas.

Pydantic validates the incoming payload from Django automatically: if a field
is missing or the email is malformed, FastAPI returns a 422 with a clear error
before any of our code runs.
"""
from datetime import datetime

from pydantic import BaseModel, EmailStr


class ContactNotification(BaseModel):
    id: int
    message_type: str = "general"
    name: str
    email: EmailStr
    subject: str = ""
    message: str
    created_at: datetime

"""
Notification endpoints.

POST /notify/contact — called by Django after a contact message is saved.
The handler returns immediately (202 Accepted) and the email is sent in the
background, so Django never waits on the SMTP round-trip.
"""
from fastapi import APIRouter, BackgroundTasks, Depends, status

from app.core.security import verify_internal_token
from app.schemas.notification import ContactNotification
from app.services.email import send_contact_notification

router = APIRouter(prefix="/notify", tags=["notifications"])


@router.post(
    "/contact",
    status_code=status.HTTP_202_ACCEPTED,
    dependencies=[Depends(verify_internal_token)],
)
async def notify_contact(payload: ContactNotification, background_tasks: BackgroundTasks):
    background_tasks.add_task(send_contact_notification, payload)
    return {"status": "queued", "message_id": payload.id}

"""
Outbound notification to the FastAPI microservice.

Design rule: notifying is *best-effort*. If the notification service is down or
slow, the visitor's contact form must still succeed. Every failure is logged and
swallowed — never raised back into the request cycle.
"""
import logging

import requests
from django.conf import settings

logger = logging.getLogger(__name__)


def notify_new_contact_message(message) -> None:
    url = settings.NOTIFICATION_SERVICE_URL
    token = settings.INTERNAL_API_TOKEN

    # Feature is optional: if not configured, quietly do nothing.
    if not url or not token:
        return

    payload = {
        "id": message.id,
        "message_type": message.message_type,
        "name": message.name,
        "email": message.email,
        "subject": message.subject,
        "message": message.message,
        "created_at": message.created_at.isoformat(),
    }

    try:
        requests.post(
            f"{url}/notify/contact",
            json=payload,
            headers={"X-Internal-Token": token},
            timeout=5,  # short — we don't want to hang the user's request
        )
    except requests.RequestException:
        logger.exception(
            "Could not reach notification-service for contact message id=%s",
            message.id,
        )

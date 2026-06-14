"""
Email delivery.

Kept deliberately small and dependency-free (uses the Python standard library
smtplib). This is the one place that talks to the SMTP server, so swapping to a
provider SDK (SendGrid, SES, etc.) later means changing only this file.
"""
import logging
import smtplib
from email.message import EmailMessage

from app.core.config import settings
from app.schemas.notification import ContactNotification

logger = logging.getLogger("notification.email")


def _build_message(payload: ContactNotification) -> EmailMessage:
    msg = EmailMessage()
    msg["Subject"] = f"New {payload.message_type} message from {payload.name}"
    msg["From"] = settings.from_address
    msg["To"] = settings.notify_to_email
    # Reply-To = the visitor, so you can reply straight from your inbox.
    msg["Reply-To"] = payload.email

    body = (
        "You received a new contact message on your portfolio.\n\n"
        f"Type:        {payload.message_type}\n"
        f"Name:        {payload.name}\n"
        f"Email:       {payload.email}\n"
        f"Subject:     {payload.subject or '(none)'}\n"
        f"Received:    {payload.created_at:%Y-%m-%d %H:%M:%S %Z}\n"
        f"Message ID:  {payload.id}\n\n"
        "Message:\n"
        "--------------------------------------------------\n"
        f"{payload.message}\n"
        "--------------------------------------------------\n"
    )
    msg.set_content(body)
    return msg


def send_contact_notification(payload: ContactNotification) -> None:
    """
    Send the notification email. Runs in a FastAPI BackgroundTask, so it does
    NOT block the HTTP response to Django. Exceptions are logged; they do not
    propagate to the caller because the request has already returned 202.
    """
    msg = _build_message(payload)

    try:
        if settings.smtp_use_ssl:
            with smtplib.SMTP_SSL(settings.smtp_host, settings.smtp_port, timeout=15) as server:
                server.login(settings.smtp_user, settings.smtp_password)
                server.send_message(msg)
        else:
            with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=15) as server:
                if settings.smtp_use_tls:
                    server.starttls()
                server.login(settings.smtp_user, settings.smtp_password)
                server.send_message(msg)

        logger.info("Notification email sent for contact message id=%s", payload.id)
    except Exception:
        # Log with traceback but swallow — a failed email must not crash the worker.
        logger.exception("Failed to send notification email for message id=%s", payload.id)

import base64
import json
import os
import re

import boto3

ses = boto3.client("sesv2")

FROM_ADDRESS = os.environ["FROM_ADDRESS"]  # contact@workwithaarjan.dev
TO_ADDRESS = os.environ["TO_ADDRESS"]      # your inbox
MESSAGE_TYPES = {"general", "job_opportunity", "hire_me", "freelance_project", "collaboration"}
LIMITS = {"name": 100, "email": 254, "subject": 200, "message": 5000}
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def respond(status, body):
    return {
        "statusCode": status,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(body),
    }


def handler(event, context):
    raw = event.get("body") or "{}"
    if event.get("isBase64Encoded"):
        raw = base64.b64decode(raw).decode("utf-8")
    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        return respond(400, {"message": "Invalid request."})

    # Honeypot: humans never see this field, bots fill everything. Pretend success.
    if data.get("website"):
        return respond(200, {"ok": True})

    f = {k: str(data.get(k, "")).strip() for k in ("message_type", "name", "email", "subject", "message")}

    if not f["name"] or not f["message"] or not EMAIL_RE.match(f["email"]):
        return respond(400, {"message": "Please enter your name, a valid email and a message."})
    for field, limit in LIMITS.items():
        if len(f[field]) > limit:
            return respond(400, {"message": f"The {field} is too long."})
    if f["message_type"] not in MESSAGE_TYPES:
        f["message_type"] = "general"

    # No line breaks in the subject line
    subject = " ".join(f"[Portfolio] {f['message_type']}: {f['subject'] or 'New message'}".split())
    body = f"From: {f['name']} <{f['email']}>\nType: {f['message_type']}\n\n{f['message']}"

    try:
        ses.send_email(
            FromEmailAddress=FROM_ADDRESS,
            Destination={"ToAddresses": [TO_ADDRESS]},
            ReplyToAddresses=[f["email"]],
            Content={"Simple": {
                "Subject": {"Data": subject},
                "Body": {"Text": {"Data": body}},
            }},
        )
    except Exception as error:
        print(f"SES send failed: {error}")  # goes to CloudWatch Logs, for you
        return respond(502, {"message": "Couldn't send right now. Please try again later."})

    return respond(200, {"ok": True})

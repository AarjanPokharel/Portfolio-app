"""
Centralized configuration, loaded from environment variables.

We use pydantic-settings so every value is validated and typed at startup —
if a required variable is missing, the service fails fast with a clear error
instead of breaking later when an email is actually sent.
"""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Read from a local .env file during development; in Docker the values
    # come from the container environment (compose passes them in).
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_env: str = "production"

    # ─── SMTP credentials ────────────────────────────────────────────────
    smtp_host: str
    smtp_port: int = 587
    smtp_user: str
    smtp_password: str
    smtp_from: str = ""           # falls back to smtp_user if left blank
    smtp_use_tls: bool = True     # STARTTLS, the common case (port 587)
    smtp_use_ssl: bool = False    # implicit SSL (port 465)

    # ─── Delivery + security ─────────────────────────────────────────────
    notify_to_email: str          # where notifications are delivered (you)
    internal_api_token: str       # shared secret; only Django knows it

    @property
    def from_address(self) -> str:
        return self.smtp_from or self.smtp_user


# A single shared settings instance imported across the app.
settings = Settings()

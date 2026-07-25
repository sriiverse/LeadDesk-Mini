import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "leaddesk-fallback-secret")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "leaddesk-fallback-jwt")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    JWT_TOKEN_LOCATION = ["headers"]
    JWT_HEADER_NAME = "Authorization"
    JWT_HEADER_TYPE = "Bearer"

    DATABASE_PATH = os.getenv("DATABASE_PATH", "leaddesk.db")
    ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@leaddesk.com")
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "Admin@123456")
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

    VALID_STATUSES = ("New", "Contacted", "Closed")
    VALID_BUDGETS = (
        "Under $1,000",
        "$1,000 - $5,000",
        "$5,000 - $10,000",
        "$10,000 - $25,000",
        "$25,000+",
    )

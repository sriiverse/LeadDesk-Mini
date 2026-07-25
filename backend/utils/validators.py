import re
from config.settings import Config

EMAIL_REGEX = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


def _trim(value):
    return value.strip() if isinstance(value, str) else value


def validate_login_payload(data):
    if not data or not isinstance(data, dict):
        return False, {"error": "Request body must be a JSON object."}

    email = _trim(data.get("email", ""))
    password = data.get("password", "")

    errors = {}

    if not email:
        errors["email"] = "Email is required."
    elif not EMAIL_REGEX.match(email):
        errors["email"] = "Please provide a valid email address."

    if not isinstance(password, str) or not password.strip():
        errors["password"] = "Password is required."

    if errors:
        return False, {"error": "Validation failed.", "details": errors}

    return True, {"email": email.lower(), "password": password}


def validate_lead_payload(data):
    if not data or not isinstance(data, dict):
        return False, {"error": "Request body must be a JSON object."}

    name = _trim(data.get("name", ""))
    email = _trim(data.get("email", ""))
    budget = _trim(data.get("budget", ""))
    message = _trim(data.get("message", ""))

    errors = {}

    if not name:
        errors["name"] = "Name is required."
    elif len(name) < 2:
        errors["name"] = "Name must be at least 2 characters."
    elif len(name) > 100:
        errors["name"] = "Name must be 100 characters or fewer."

    if not email:
        errors["email"] = "Email is required."
    elif not EMAIL_REGEX.match(email):
        errors["email"] = "Please provide a valid email address."
    elif len(email) > 255:
        errors["email"] = "Email must be 255 characters or fewer."

    if not budget:
        errors["budget"] = "Budget range is required."
    elif budget not in Config.VALID_BUDGETS:
        errors["budget"] = "Please select a valid budget range."

    if not message:
        errors["message"] = "Message is required."
    elif len(message) < 10:
        errors["message"] = "Message must be at least 10 characters."
    elif len(message) > 2000:
        errors["message"] = "Message must be 2000 characters or fewer."

    if errors:
        return False, {"error": "Validation failed.", "details": errors}

    return True, {
        "name": name,
        "email": email.lower(),
        "budget": budget,
        "message": message,
    }


def validate_status(status):
    if not isinstance(status, str):
        return False, {"error": "Status must be a string."}

    status = status.strip()
    if status not in Config.VALID_STATUSES:
        return False, {
            "error": f"Invalid status. Allowed values: {', '.join(Config.VALID_STATUSES)}."
        }

    return True, status

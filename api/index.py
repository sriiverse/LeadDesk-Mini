"""
Vercel Python entrypoint.

Exposes the Flask app so requests to /api/* are handled by LeadDesk Mini.
"""

from __future__ import annotations

import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parents[1] / "backend"
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from app import app  # noqa: E402  # Flask WSGI app discovered by Vercel

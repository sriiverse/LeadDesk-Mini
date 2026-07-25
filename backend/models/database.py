import os
import sqlite3
from flask import g, current_app


def get_db():
    if "db" not in g:
        db_path = current_app.config["DATABASE_PATH"]
        if not os.path.isabs(db_path):
            db_path = os.path.join(current_app.root_path, db_path)

        g.db = sqlite3.connect(db_path)
        g.db.row_factory = sqlite3.Row
        g.db.execute("PRAGMA foreign_keys = ON")
    return g.db


def close_db(_error=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()


def init_db(app, bcrypt):
    with app.app_context():
        db = get_db()
        db.executescript(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT (datetime('now'))
            );

            CREATE TABLE IF NOT EXISTS leads (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                budget TEXT NOT NULL,
                message TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'New',
                created_at TEXT NOT NULL DEFAULT (datetime('now'))
            );

            CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
            CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
            CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
            """
        )
        db.commit()

        admin_email = app.config["ADMIN_EMAIL"].lower().strip()
        existing = db.execute(
            "SELECT id FROM users WHERE email = ?", (admin_email,)
        ).fetchone()

        if not existing:
            password_hash = bcrypt.generate_password_hash(
                app.config["ADMIN_PASSWORD"]
            ).decode("utf-8")
            db.execute(
                "INSERT INTO users (email, password_hash) VALUES (?, ?)",
                (admin_email, password_hash),
            )
            db.commit()

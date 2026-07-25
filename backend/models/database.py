import os
import sqlite3
from flask import g, current_app

try:
    import psycopg
    from psycopg.rows import dict_row
except ImportError:  # pragma: no cover - local sqlite-only installs
    psycopg = None
    dict_row = None


def _database_url():
    return (
        os.getenv("DATABASE_URL")
        or os.getenv("POSTGRES_URL")
        or os.getenv("POSTGRES_PRISMA_URL")
        or ""
    ).strip()


def using_postgres():
    return bool(_database_url())


class _SqliteCursorWrapper:
    def __init__(self, cursor):
        self._cursor = cursor

    @property
    def lastrowid(self):
        return self._cursor.lastrowid

    @property
    def rowcount(self):
        return self._cursor.rowcount

    def fetchone(self):
        return self._cursor.fetchone()

    def fetchall(self):
        return self._cursor.fetchall()


class _SqliteConnection:
    def __init__(self, conn):
        self._conn = conn

    def execute(self, query, params=None):
        cursor = self._conn.execute(query, params or ())
        return _SqliteCursorWrapper(cursor)

    def executescript(self, script):
        return self._conn.executescript(script)

    def commit(self):
        self._conn.commit()

    def close(self):
        self._conn.close()


class _PostgresCursorWrapper:
    def __init__(self, cursor, lastrowid=None):
        self._cursor = cursor
        self.lastrowid = lastrowid

    @property
    def rowcount(self):
        return self._cursor.rowcount

    def fetchone(self):
        return self._cursor.fetchone()

    def fetchall(self):
        return self._cursor.fetchall()


class _PostgresConnection:
    def __init__(self, conn):
        self._conn = conn

    def execute(self, query, params=None):
        pg_query = query.replace("?", "%s")
        returning_id = False
        if pg_query.strip().upper().startswith("INSERT") and "RETURNING" not in pg_query.upper():
            pg_query = pg_query.rstrip().rstrip(";") + " RETURNING id"
            returning_id = True

        cursor = self._conn.execute(pg_query, params or ())
        lastrowid = None
        if returning_id:
            row = cursor.fetchone()
            if row:
                lastrowid = row["id"] if isinstance(row, dict) else row[0]
        return _PostgresCursorWrapper(cursor, lastrowid=lastrowid)

    def commit(self):
        self._conn.commit()

    def close(self):
        self._conn.close()


def get_db():
    if "db" not in g:
        database_url = _database_url()
        if database_url:
            if psycopg is None:
                raise RuntimeError("psycopg is required when DATABASE_URL is set.")
            conn = psycopg.connect(database_url, row_factory=dict_row)
            g.db = _PostgresConnection(conn)
            g.db_backend = "postgres"
        else:
            db_path = current_app.config["DATABASE_PATH"]
            if not os.path.isabs(db_path):
                db_path = os.path.join(current_app.root_path, db_path)
            conn = sqlite3.connect(db_path)
            conn.row_factory = sqlite3.Row
            conn.execute("PRAGMA foreign_keys = ON")
            g.db = _SqliteConnection(conn)
            g.db_backend = "sqlite"
    return g.db


def close_db(_error=None):
    db = g.pop("db", None)
    g.pop("db_backend", None)
    if db is not None:
        db.close()


def init_db(app, bcrypt):
    with app.app_context():
        db = get_db()
        if using_postgres():
            db.execute(
                """
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    email TEXT NOT NULL UNIQUE,
                    password_hash TEXT NOT NULL,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                )
                """
            )
            db.execute(
                """
                CREATE TABLE IF NOT EXISTS leads (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    budget TEXT NOT NULL,
                    message TEXT NOT NULL,
                    status TEXT NOT NULL DEFAULT 'New',
                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                )
                """
            )
            db.execute(
                "CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status)"
            )
            db.execute(
                "CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email)"
            )
            db.execute(
                "CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at)"
            )
            db.commit()
        else:
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

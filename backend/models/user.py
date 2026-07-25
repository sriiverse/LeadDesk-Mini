from .database import get_db


class User:
    @staticmethod
    def find_by_email(email):
        db = get_db()
        row = db.execute(
            "SELECT id, email, password_hash, created_at FROM users WHERE email = ?",
            (email.lower(),),
        ).fetchone()
        return dict(row) if row else None

    @staticmethod
    def find_by_id(user_id):
        db = get_db()
        row = db.execute(
            "SELECT id, email, password_hash, created_at FROM users WHERE id = ?",
            (user_id,),
        ).fetchone()
        return dict(row) if row else None

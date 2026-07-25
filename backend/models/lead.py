from .database import get_db
from utils.serialize import serialize_row


class Lead:
    @staticmethod
    def create(name, email, budget, message, status="New"):
        db = get_db()
        cursor = db.execute(
            """
            INSERT INTO leads (name, email, budget, message, status)
            VALUES (?, ?, ?, ?, ?)
            """,
            (name, email, budget, message, status),
        )
        db.commit()
        return Lead.find_by_id(cursor.lastrowid)

    @staticmethod
    def find_by_id(lead_id):
        db = get_db()
        row = db.execute(
            """
            SELECT id, name, email, budget, message, status, created_at
            FROM leads WHERE id = ?
            """,
            (lead_id,),
        ).fetchone()
        return serialize_row(row)

    @staticmethod
    def get_all(search=None, status=None):
        db = get_db()
        query = """
            SELECT id, name, email, budget, message, status, created_at
            FROM leads WHERE 1=1
        """
        params = []

        if search:
            query += " AND (name LIKE ? OR email LIKE ? OR message LIKE ?)"
            term = f"%{search}%"
            params.extend([term, term, term])

        if status:
            query += " AND status = ?"
            params.append(status)

        query += " ORDER BY created_at DESC"

        rows = db.execute(query, params).fetchall()
        return [serialize_row(row) for row in rows]

    @staticmethod
    def update_status(lead_id, status):
        db = get_db()
        cursor = db.execute(
            "UPDATE leads SET status = ? WHERE id = ?",
            (status, lead_id),
        )
        db.commit()
        if cursor.rowcount == 0:
            return None
        return Lead.find_by_id(lead_id)

    @staticmethod
    def get_stats():
        db = get_db()
        total = db.execute("SELECT COUNT(*) AS count FROM leads").fetchone()["count"]
        new = db.execute(
            "SELECT COUNT(*) AS count FROM leads WHERE status = 'New'"
        ).fetchone()["count"]
        contacted = db.execute(
            "SELECT COUNT(*) AS count FROM leads WHERE status = 'Contacted'"
        ).fetchone()["count"]
        closed = db.execute(
            "SELECT COUNT(*) AS count FROM leads WHERE status = 'Closed'"
        ).fetchone()["count"]

        return {
            "total": total,
            "new": new,
            "contacted": contacted,
            "closed": closed,
        }

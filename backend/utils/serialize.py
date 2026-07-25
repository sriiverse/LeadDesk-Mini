def serialize_row(row):
    if row is None:
        return None
    data = dict(row)
    created = data.get("created_at")
    if hasattr(created, "isoformat"):
        data["created_at"] = created.isoformat()
    return data

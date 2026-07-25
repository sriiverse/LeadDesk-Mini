from flask import jsonify, request
from models.lead import Lead
from utils.validators import validate_lead_payload, validate_status
from config.settings import Config


def create_lead():
    data = request.get_json(silent=True)
    valid, result = validate_lead_payload(data)
    if not valid:
        return jsonify(result), 400

    lead = Lead.create(
        name=result["name"],
        email=result["email"],
        budget=result["budget"],
        message=result["message"],
        status="New",
    )

    return (
        jsonify(
            {
                "message": "Thank you! Your message has been submitted successfully.",
                "lead": lead,
            }
        ),
        201,
    )


def get_leads():
    search = request.args.get("search", "").strip() or None
    status = request.args.get("status", "").strip() or None

    if status and status not in Config.VALID_STATUSES:
        return (
            jsonify(
                {
                    "error": f"Invalid status filter. Allowed values: {', '.join(Config.VALID_STATUSES)}."
                }
            ),
            400,
        )

    leads = Lead.get_all(search=search, status=status)
    stats = Lead.get_stats()

    return jsonify({"leads": leads, "stats": stats, "count": len(leads)}), 200


def update_lead_status(lead_id):
    data = request.get_json(silent=True)
    if not data or not isinstance(data, dict):
        return jsonify({"error": "Request body must be a JSON object."}), 400

    valid, status = validate_status(data.get("status"))
    if not valid:
        return jsonify(status), 400

    try:
        lead_id = int(lead_id)
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid lead ID."}), 400

    lead = Lead.update_status(lead_id, status)
    if not lead:
        return jsonify({"error": "Lead not found."}), 404

    return jsonify({"message": "Lead status updated.", "lead": lead}), 200


def get_lead_stats():
    return jsonify({"stats": Lead.get_stats()}), 200

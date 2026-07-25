from flask import Blueprint
from flask_jwt_extended import jwt_required
from controllers import lead_controller

lead_bp = Blueprint("leads", __name__)


@lead_bp.route("/leads", methods=["POST"])
def create_lead():
    return lead_controller.create_lead()


@lead_bp.route("/leads", methods=["GET"])
@jwt_required()
def get_leads():
    return lead_controller.get_leads()


@lead_bp.route("/leads/<int:lead_id>", methods=["PATCH"])
@jwt_required()
def update_lead(lead_id):
    return lead_controller.update_lead_status(lead_id)


@lead_bp.route("/leads/stats", methods=["GET"])
@jwt_required()
def get_stats():
    return lead_controller.get_lead_stats()

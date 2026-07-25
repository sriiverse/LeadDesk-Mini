from flask import Blueprint
from flask_jwt_extended import jwt_required
from controllers import auth_controller

auth_bp = Blueprint("auth", __name__)


def register_auth_routes(bcrypt):
    @auth_bp.route("/login", methods=["POST"])
    def login():
        return auth_controller.login(bcrypt)

    @auth_bp.route("/me", methods=["GET"])
    @jwt_required()
    def me():
        return auth_controller.me()

    return auth_bp

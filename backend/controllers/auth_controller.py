from flask import jsonify, current_app
from flask_jwt_extended import create_access_token, get_jwt_identity
from models.user import User
from utils.validators import validate_login_payload


def login(bcrypt):
    from flask import request

    data = request.get_json(silent=True)
    valid, result = validate_login_payload(data)
    if not valid:
        return jsonify(result), 400

    user = User.find_by_email(result["email"])
    if not user or not bcrypt.check_password_hash(
        user["password_hash"], result["password"]
    ):
        return jsonify({"error": "Invalid email or password."}), 401

    access_token = create_access_token(identity=str(user["id"]))
    return (
        jsonify(
            {
                "message": "Login successful.",
                "access_token": access_token,
                "user": {"id": user["id"], "email": user["email"]},
            }
        ),
        200,
    )


def me():
    user_id = get_jwt_identity()
    user = User.find_by_id(int(user_id))
    if not user:
        return jsonify({"error": "User not found."}), 404

    return jsonify({"user": {"id": user["id"], "email": user["email"]}}), 200

import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

from config.settings import Config
from models.database import init_db, close_db
from routes.auth_routes import register_auth_routes
from routes.lead_routes import lead_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    frontend_url = (app.config["FRONTEND_URL"] or "").rstrip("/")
    extra_origins = [
        origin.strip().rstrip("/")
        for origin in os.getenv("CORS_ORIGINS", "").split(",")
        if origin.strip()
    ]
    allowed_origins = list(
        {
            frontend_url,
            *extra_origins,
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        }
    )
    # Drop empty entries
    allowed_origins = [origin for origin in allowed_origins if origin]

    CORS(
        app,
        resources={r"/api/*": {"origins": allowed_origins}},
        supports_credentials=True,
    )

    bcrypt = Bcrypt(app)
    jwt = JWTManager(app)

    app.teardown_appcontext(close_db)
    init_db(app, bcrypt)

    auth_bp = register_auth_routes(bcrypt)
    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(lead_bp, url_prefix="/api")

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok", "service": "LeadDesk Mini API"}), 200

    @jwt.unauthorized_loader
    def unauthorized_callback(reason):
        return jsonify({"error": "Authentication required.", "detail": reason}), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(reason):
        return jsonify({"error": "Invalid or expired token.", "detail": reason}), 401

    @jwt.expired_token_loader
    def expired_token_callback(_jwt_header, _jwt_payload):
        return jsonify({"error": "Token has expired. Please log in again."}), 401

    @app.errorhandler(404)
    def not_found(_error):
        return jsonify({"error": "Resource not found."}), 404

    @app.errorhandler(405)
    def method_not_allowed(_error):
        return jsonify({"error": "Method not allowed."}), 405

    @app.errorhandler(500)
    def internal_error(_error):
        return jsonify({"error": "An unexpected server error occurred."}), 500

    return app


app = create_app()


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("FLASK_ENV", "production") == "development"
    app.run(host="0.0.0.0", port=port, debug=debug)

import random
from flask import Flask, jsonify
from datetime import timedelta
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_swagger_ui import get_swaggerui_blueprint
from config import Config
from extensions import db, bcrypt, jwt

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    Migrate(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)
    CORS(app)

    api = Api(app)

    # Swagger setup
    SWAGGER_URL = '/swagger'
    API_URL = '/static/swagger.json'
    swaggerui_blueprint = get_swaggerui_blueprint(SWAGGER_URL, API_URL, config={'app_name': "Gym Management API"})
    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

    with app.app_context():
        from routes import initialize_routes
        initialize_routes(api)
        db.create_all()

    @app.route('/')
    def index():
        return jsonify({"message": "Welcome to the Gym Management System  API"})

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
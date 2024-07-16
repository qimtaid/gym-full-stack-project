import logging
from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_swagger_ui import get_swaggerui_blueprint
from config import Config
from extensions import db, bcrypt, jwt

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize logging
    logging.basicConfig(level=logging.DEBUG)

    # Initialize extensions
    db.init_app(app)
    Migrate(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # Enable CORS globally for all routes
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

    # Blueprint for auth routes
    bp = Blueprint("auth", __name__, url_prefix="/auth")
    CORS(bp, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

    api = Api(app)

    # Swagger setup
    SWAGGER_URL = '/swagger'
    API_URL = '/static/swagger.json'
    swaggerui_blueprint = get_swaggerui_blueprint(SWAGGER_URL, API_URL, config={'app_name': "Gym Management API"})
    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

    # Register the auth blueprint
    app.register_blueprint(bp)

    with app.app_context():
        from routes import initialize_routes
        initialize_routes(api)
        db.create_all()

    @app.route('/')
    def index():
        return jsonify({"message": "Welcome to the Gym Management System API"})

    # Handle preflight requests for the logout endpoint
    @app.route('/logout', methods=['OPTIONS', 'POST'])
    def logout():
        if request.method == 'OPTIONS':
            return '', 204
        # Implement your logout logic here
        return jsonify({"message": "Successfully logged out"}), 200
    
    # ...

    # @app.route('/trainers/<int:id>', methods=['OPTIONS', 'GET', 'PUT', 'DELETE'])
    # def trainer_options(id):
    #     if request.method == 'OPTIONS':
    #         return '', 204
    #     elif request.method == 'GET':
    #         trainer = Trainer.query.get(id)
    #         if trainer:
    #             return jsonify({'name': trainer.name, 'pecialty': trainer.specialty})
    #         else:
    #             return jsonify({'error': 'Trainer not found'}), 404
    #     elif request.method == 'PUT':
    #         trainer = Trainer.query.get(id)
    #         if trainer:
    #             trainer.name = request.json.get('name', trainer.name)
    #             trainer.specialty = request.json.get('specialty', trainer.specialty)
    #             db.session.commit()
    #             return jsonify({'message': 'Trainer updated successfully'})
    #         else:
    #             return jsonify({'error': 'Trainer not found'}), 404
    #     elif request.method == 'DELETE':
    #         trainer = Trainer.query.get(id)
    #         if trainer:
    #             db.session.delete(trainer)
    #             db.session.commit()
    #             return jsonify({'message': 'Trainer deleted successfully'})
    #         else:
    #             return jsonify({'error': 'Trainer not found'}), 404

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)
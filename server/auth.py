from flask import Flask, Blueprint, request, jsonify
from flask_cors import CORS
from models import User, db
from flask_jwt_extended import create_access_token
import logging

app = Flask(__name__)
CORS(app)

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight"}), 200

    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input data provided"}), 400

        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not username or not email or not password:
            return jsonify({"error": "Missing fields"}), 400

        if User.query.filter_by(username=username).first():
            return jsonify({"error": "Username already exists"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"error": "Email already exists"}), 400

        new_user = User(username=username, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        logging.error(f"Error registering user: {e}")
        return jsonify({"error": "Internal server error"}), 500

@bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'OK'})
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'POST,OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response

    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input data provided"}), 400

        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"error": "Missing fields"}), 400

        user = User.query.filter_by(username=username).first()

        if user is None or not user.check_password(password):
            return jsonify({"error": "Invalid username or password"}), 401

        access_token = create_access_token(identity=username)
        return jsonify({"access_token": access_token}), 200
    except Exception as e:
        logging.error(f"Error logging in user: {e}")
        return jsonify({"error": "Internal server error"}), 500

app.register_blueprint(bp)

if __name__ == '__main__':
    app.run(port=5000)

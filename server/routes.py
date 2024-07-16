from flask_restful import Resource, Api
from models import User, Member, Trainer, FitnessClass, Schedule, Attendance, Payment, db
from flask import request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import logging

class UserRegister(Resource):
    def options(self):
        return '', 204

    def post(self):
        data = request.get_json()
        logging.debug(f"Received data: {data}")

        if not data:
            logging.error("No input data provided")
            return {"error": "No input data provided"}, 400

        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not username or not email or not password:
            logging.error(f"Missing fields - Username: {username}, Email: {email}, Password: {password}")
            return {"error": "Missing fields"}, 400

        if User.query.filter_by(username=username).first():
            logging.error(f"Username already exists: {username}")
            return {"error": "Username already exists"}, 400

        if User.query.filter_by(email=email).first():
            logging.error(f"Email already exists: {email}")
            return {"error": "Email already exists"}, 400

        new_user = User(username=username, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        logging.info(f"User registered successfully: {username}")
        return {"message": "User registered successfully"}, 201

class UserLogin(Resource):
    def options(self):
        return '', 204

    def post(self):
        data = request.get_json()
        logging.debug(f"Received data: {data}")

        if not data:
            logging.error("No input data provided")
            return {"error": "No input data provided"}, 400

        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            logging.error(f"Missing fields - Username: {username}, Password: {password}")
            return {"error": "Missing fields"}, 400

        user = User.query.filter_by(username=username).first()

        if user is None or not user.check_password(password):
            logging.error(f"Invalid username or password for username: {username}")
            return {"error": "Invalid username or password"}, 401

        access_token = create_access_token(identity=username)
        logging.info(f"User logged in successfully: {username}")
        return {"access_token": access_token}, 200

class CurrentUser(Resource):
    @jwt_required()
    def options(self):
        return '', 204

    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()
        if user:
            return {"username": user.username, "email": user.email}, 200
        else:
            return {"error": "User not found"}, 404

class MemberListResource(Resource):
    def options(self):
        return '', 204

    def get(self):
        members = Member.query.all()
        return jsonify([member.to_dict() for member in members])

class TrainerListResource(Resource):
    def options(self):
        return '', 204

    def get(self):
        trainers = Trainer.query.all()
        return jsonify([trainer.to_dict() for trainer in trainers])

class FitnessClassListResource(Resource):
    def options(self):
        return '', 204

    def get(self):
        fitness_classes = FitnessClass.query.all()
        return jsonify([fitness_class.to_dict() for fitness_class in fitness_classes])



def initialize_routes(api):
    api.add_resource(UserRegister, '/auth/register')
    api.add_resource(UserLogin, '/auth/login')
    api.add_resource(CurrentUser, '/current_user')  # Register the new endpoint
    api.add_resource(MemberListResource, '/members')
    api.add_resource(TrainerListResource, '/trainers')
    api.add_resource(FitnessClassListResource, '/fitness_classes')
    # Add other routes as necessary, ensuring they are defined

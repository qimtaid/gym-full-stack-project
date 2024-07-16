import logging
from flask import request, jsonify, Blueprint
from flask_restful import Api, Resource
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import User, Member, Trainer, FitnessClass, Schedule, Attendance, Payment, db
from datetime import datetime

logger = logging.getLogger(__name__)

class UserRegister(Resource):
    def options(self):
        return '', 204

    def post(self):
        data = request.get_json()
        logger.debug(f"Received data: {data}")

        if not data:
            logger.error("No input data provided")
            return {"error": "No input data provided"}, 400

        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not username or not email or not password:
            logger.error(f"Missing fields - Username: {username}, Email: {email}, Password: {password}")
            return {"error": "Missing fields"}, 400

        if User.query.filter_by(username=username).first():
            logger.error(f"Username already exists: {username}")
            return {"error": "Username already exists"}, 400

        if User.query.filter_by(email=email).first():
            logger.error(f"Email already exists: {email}")
            return {"error": "Email already exists"}, 400

        new_user = User(username=username, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        logger.info(f"User registered successfully: {username}")
        return {"message": "User registered successfully"}, 201

class UserLogin(Resource):
    def options(self):
        return '', 204

    def post(self):
        data = request.get_json()
        logger.debug(f"Received data: {data}")

        if not data:
            logger.error("No input data provided")
            return {"error": "No input data provided"}, 400

        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            logger.error(f"Missing fields - Username: {username}, Password: {password}")
            return {"error": "Missing fields"}, 400

        user = User.query.filter_by(username=username).first()

        if user is None or not user.check_password(password):
            logger.error(f"Invalid username or password for username: {username}")
            return {"error": "Invalid username or password"}, 401

        access_token = create_access_token(identity=username)
        logger.info(f"User logged in successfully: {username}")
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

class AttendanceListResource(Resource):
    def options(self):
        return '', 204

    def get(self):
        attendance = Attendance.query.all()
        return jsonify([attend.to_dict() for attend in attendance])

    def post(self):
        data = request.get_json()
        logger.debug(f"Received data: {data}")

        if not data:
            logger.error("No input data provided")
            return {"error": "No input data provided"}, 400

        member_id = data.get('member_id')
        fitness_class_id = data.get('fitness_class_id')
        attended = data.get('attended')

        if not member_id or not fitness_class_id or attended is None:
            logger.error("Missing fields")
            return {"error": "Missing fields"}, 400

        # Check if both member_id and fitness_class_id exist in their respective tables
        member = Member.query.get(member_id)
        fitness_class = FitnessClass.query.get(fitness_class_id)

        if not member:
            logger.error(f"Member not found with ID: {member_id}")
            return {"error": "Member not found"}, 404

        if not fitness_class:
            logger.error(f"Fitness class not found with ID: {fitness_class_id}")
            return {"error": "Fitness class not found"}, 404

        # Create new attendance record
        new_attendance = Attendance(member_id=member_id, fitness_class_id=fitness_class_id, attended=attended)
        db.session.add(new_attendance)
        db.session.commit()

        logger.info("Attendance recorded successfully")
        return {"message": "Attendance recorded successfully"}, 201

class ScheduleListResource(Resource):
    def options(self):
        return '', 204

    def get(self):
        schedules = Schedule.query.all()
        return jsonify([schedule.to_dict() for schedule in schedules])

    def post(self):
        data = request.get_json()
        logger.debug(f"Received data: {data}")

        if not data:
            logger.error("No input data provided")
            return {"error": "No input data provided"}, 400

        trainer_id = data.get('trainer_id')
        fitness_class_id = data.get('fitness_class_id')
        day_of_week = data.get('day_of_week')
        start_time = data.get('start_time')
        end_time = data.get('end_time')

        if not trainer_id or not fitness_class_id or not day_of_week or not start_time or not end_time:
            logger.error("Missing fields")
            return {"error": "Missing fields"}, 400

        # Check if trainer_id and fitness_class_id exist in their respective tables
        trainer = Trainer.query.get(trainer_id)
        fitness_class = FitnessClass.query.get(fitness_class_id)

        if not trainer:
            logger.error(f"Trainer not found with ID: {trainer_id}")
            return {"error": "Trainer not found"}, 404

        if not fitness_class:
            logger.error(f"Fitness class not found with ID: {fitness_class_id}")
            return {"error": "Fitness class not found"}, 404

        # Create new schedule record
        new_schedule = Schedule(trainer_id=trainer_id, fitness_class_id=fitness_class_id,
                                day_of_week=day_of_week, start_time=start_time, end_time=end_time)
        db.session.add(new_schedule)
        db.session.commit()

        logger.info("Schedule created successfully")
        return {"message": "Schedule created successfully"}, 201

class PaymentListResource(Resource):
    def options(self):
        return '', 204

    def get(self):
        payments = Payment.query.all()
        return jsonify([payment.to_dict() for payment in payments])

    def post(self):
        data = request.get_json()
        logger.debug(f"Received data: {data}")

        if not data:
            logger.error("No input data provided")
            return {"error": "No input data provided"}, 400

        member_id = data.get('member_id')
        amount = data.get('amount')
        payment_date = data.get('payment_date')

        if not member_id or not amount or not payment_date:
            logger.error("Missing fields")
            return {"error": "Missing fields"}, 400

        # Check if member_id exists
        member = Member.query.get(member_id)

        if not member:
            logger.error(f"Member not found with ID: {member_id}")
            return {"error": "Member not found"}, 404

        # Create new payment record
        new_payment = Payment(member_id=member_id, amount=amount, payment_date=datetime.strptime(payment_date, '%Y-%m-%d'))
        db.session.add(new_payment)
        db.session.commit()

        logger.info("Payment recorded successfully")
        return {"message": "Payment recorded successfully"}, 201

def initialize_routes(api):
    api.add_resource(UserRegister, '/auth/register')
    api.add_resource(UserLogin, '/auth/login')
    api.add_resource(CurrentUser, '/current_user')
    api.add_resource(MemberListResource, '/members')
    api.add_resource(TrainerListResource, '/trainers')
    api.add_resource(FitnessClassListResource, '/fitness_classes')
    api.add_resource(AttendanceListResource, '/attendance')
    api.add_resource(ScheduleListResource, '/schedules')
    api.add_resource(PaymentListResource, '/payments')

    # Add other routes as necessary


from flask_restful import Resource, reqparse, Api
from models import User, Member, Trainer, FitnessClass, Schedule, Attendance, Payment, db
from flask import request, jsonify
from flask_jwt_extended import create_access_token

class UserRegister(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        email = data['email']
        password = data['password']

        if User.query.filter_by(username=username).first():
            return jsonify({"error": "Username already exists"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"error": "Email already exists"}), 400

        new_user = User(username=username, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201

class UserLogin(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']

        user = User.query.filter_by(username=username).first()

        if user is None or not user.check_password(password):
            return jsonify({"error": "Invalid username or password"}), 401

        access_token = create_access_token(identity=username)
        return jsonify({"access_token": access_token}), 200

class MemberResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name', type=str, required=True, help='Name cannot be blank.')
    parser.add_argument('membership_type', type=str, required=True, help='Membership type cannot be blank.')

    def get(self, member_id):
        member = Member.query.get(member_id)
        if member:
            return member.to_dict()
        return {'message': 'Member not found'}, 404

    def put(self, member_id):
        data = MemberResource.parser.parse_args()
        member = Member.query.get(member_id)
        if member:
            member.name = data['name']
            member.membership_type = data['membership_type']
            db.session.commit()
            return member.to_dict()
        return {'message': 'Member not found'}, 404

    def delete(self, member_id):
        member = Member.query.get(member_id)
        if member:
            db.session.delete(member)
            db.session.commit()
            return {'message': 'Member deleted'}
        return {'message': 'Member not found'}, 404

class MemberListResource(Resource):
    def get(self):
        members = Member.query.all()
        return [member.to_dict() for member in members]

    def post(self):
        data = MemberResource.parser.parse_args()
        new_member = Member(name=data['name'], membership_type=data['membership_type'])
        db.session.add(new_member)
        db.session.commit()
        return new_member.to_dict(), 201

class TrainerResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name', type=str, required=True, help='Name cannot be blank.')
    parser.add_argument('specialty', type=str, required=True, help='Specialty cannot be blank.')

    def get(self, trainer_id):
        trainer = Trainer.query.get(trainer_id)
        if trainer:
            return trainer.to_dict()
        return {'message': 'Trainer not found'}, 404

    def put(self, trainer_id):
        data = TrainerResource.parser.parse_args()
        trainer = Trainer.query.get(trainer_id)
        if trainer:
            trainer.name = data['name']
            trainer.specialty = data['specialty']
            db.session.commit()
            return trainer.to_dict()
        return {'message': 'Trainer not found'}, 404

    def delete(self, trainer_id):
        trainer = Trainer.query.get(trainer_id)
        if trainer:
            db.session.delete(trainer)
            db.session.commit()
            return {'message': 'Trainer deleted'}
        return {'message': 'Trainer not found'}, 404

class TrainerListResource(Resource):
    def get(self):
        trainers = Trainer.query.all()
        return [trainer.to_dict() for trainer in trainers]

    def post(self):
        data = TrainerResource.parser.parse_args()
        new_trainer = Trainer(name=data['name'], specialty=data['specialty'])
        db.session.add(new_trainer)
        db.session.commit()
        return new_trainer.to_dict(), 201

class FitnessClassResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name', type=str, required=True, help='Name cannot be blank.')
    parser.add_argument('trainer_id', type=int, required=True, help='Trainer ID cannot be blank.')

    def get(self, fitness_class_id):
        fitness_class = FitnessClass.query.get(fitness_class_id)
        if fitness_class:
            return fitness_class.to_dict()
        return {'message': 'Fitness class not found'}, 404

    def put(self, fitness_class_id):
        data = FitnessClassResource.parser.parse_args()
        fitness_class = FitnessClass.query.get(fitness_class_id)
        if fitness_class:
            fitness_class.name = data['name']
            fitness_class.trainer_id = data['trainer_id']
            db.session.commit()
            return fitness_class.to_dict()
        return {'message': 'Fitness class not found'}, 404

    def delete(self, fitness_class_id):
        fitness_class = FitnessClass.query.get(fitness_class_id)
        if fitness_class:
            db.session.delete(fitness_class)
            db.session.commit()
            return {'message': 'Fitness class deleted'}
        return {'message': 'Fitness class not found'}, 404

class FitnessClassListResource(Resource):
    def get(self):
        fitness_classes = FitnessClass.query.all()
        return [fitness_class.to_dict() for fitness_class in fitness_classes]

    def post(self):
        data = FitnessClassResource.parser.parse_args()
        new_fitness_class = FitnessClass(name=data['name'], trainer_id=data['trainer_id'])
        db.session.add(new_fitness_class)
        db.session.commit()
        return new_fitness_class.to_dict(), 201

class ScheduleResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('fitness_class_id', type=int, required=True, help='Fitness class ID cannot be blank.')
    parser.add_argument('date', type=str, required=True, help='Date cannot be blank.')

    def get(self, schedule_id):
        schedule = Schedule.query.get(schedule_id)
        if schedule:
            return schedule.to_dict()
        return {'message': 'Schedule not found'}, 404

    def put(self, schedule_id):
        data = ScheduleResource.parser.parse_args()
        schedule = Schedule.query.get(schedule_id)
        if schedule:
            schedule.fitness_class_id = data['fitness_class_id']
            schedule.date = data['date']
            db.session.commit()
            return schedule.to_dict()
        return {'message': 'Schedule not found'}, 404

    def delete(self, schedule_id):
        schedule = Schedule.query.get(schedule_id)
        if schedule:
            db.session.delete(schedule)
            db.session.commit()
            return {'message': 'Schedule deleted'}
        return {'message': 'Schedule not found'}, 404

class ScheduleListResource(Resource):
    def get(self):
        schedules = Schedule.query.all()
        return [schedule.to_dict() for schedule in schedules]

    def post(self):
        data = ScheduleResource.parser.parse_args()
        new_schedule = Schedule(fitness_class_id=data['fitness_class_id'], date=data['date'])
        db.session.add(new_schedule)
        db.session.commit()
        return new_schedule.to_dict(), 201

class AttendanceResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('member_id', type=int, required=True, help='Member ID cannot be blank.')
    parser.add_argument('fitness_class_id', type=int, required=True, help='Fitness class ID cannot be blank.')

    def get(self, attendance_id):
        attendance = Attendance.query.get(attendance_id)
        if attendance:
            return attendance.to_dict()
        return {'message': 'Attendance not found'}, 404

    def put(self, attendance_id):
        data = AttendanceResource.parser.parse_args()
        attendance = Attendance.query.get(attendance_id)
        if attendance:
            attendance.member_id = data['member_id']
            attendance.fitness_class_id = data['fitness_class_id']
            db.session.commit()
            return attendance.to_dict()
        return {'message': 'Attendance not found'}, 404

    def delete(self, attendance_id):
        attendance = Attendance.query.get(attendance_id)
        if attendance:
            db.session.delete(attendance)
            db.session.commit()
            return {'message': 'Attendance deleted'}
        return {'message': 'Attendance not found'}, 404

class AttendanceListResource(Resource):
    def get(self):
        attendances = Attendance.query.all()
        return [attendance.to_dict() for attendance in attendances]

    def post(self):
        data = AttendanceResource.parser.parse_args()
        new_attendance = Attendance(member_id=data['member_id'], fitness_class_id=data['fitness_class_id'])
        db.session.add(new_attendance)
        db.session.commit()
        return new_attendance.to_dict(), 201

class PaymentResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('member_id', type=int, required=True, help='Member ID cannot be blank.')
    parser.add_argument('amount', type=float, required=True, help='Amount cannot be blank.')
    parser.add_argument('date', type=str, required=True, help='Date cannot be blank.')

    def get(self, payment_id):
        payment = Payment.query.get(payment_id)
        if payment:
            return payment.to_dict()
        return {'message': 'Payment not found'}, 404

    def put(self, payment_id):
        data = PaymentResource.parser.parse_args()
        payment = Payment.query.get(payment_id)
        if payment:
            payment.member_id = data['member_id']
            payment.amount = data['amount']
            payment.date = data['date']
            db.session.commit()
            return payment.to_dict()
        return {'message': 'Payment not found'}, 404

    def delete(self, payment_id):
        payment = Payment.query.get(payment_id)
        if payment:
            db.session.delete(payment)
            db.session.commit()
            return {'message': 'Payment deleted'}
        return {'message': 'Payment not found'}, 404

class PaymentListResource(Resource):
    def get(self):
        payments = Payment.query.all()
        return [payment.to_dict() for payment in payments]

    def post(self):
        data = PaymentResource.parser.parse_args()
        new_payment = Payment(member_id=data['member_id'], amount=data['amount'], date=data['date'])
        db.session.add(new_payment)
        db.session.commit()
        return new_payment.to_dict(), 201

def initialize_routes(api):
    api.add_resource(UserRegister, '/register')
    api.add_resource(UserLogin, '/login')
    api.add_resource(MemberResource, '/member/<int:member_id>')
    api.add_resource(MemberListResource, '/members')
    api.add_resource(TrainerResource, '/trainer/<int:trainer_id>')
    api.add_resource(TrainerListResource, '/trainers')
    api.add_resource(FitnessClassResource, '/fitness_class/<int:fitness_class_id>')
    api.add_resource(FitnessClassListResource, '/fitness_classes')
    api.add_resource(ScheduleResource, '/schedule/<int:schedule_id>')
    api.add_resource(ScheduleListResource, '/schedules')
    api.add_resource(AttendanceResource, '/attendance/<int:attendance_id>')
    api.add_resource(AttendanceListResource, '/attendances')
    api.add_resource(PaymentResource, '/payment/<int:payment_id>')
    api.add_resource(PaymentListResource, '/payments')

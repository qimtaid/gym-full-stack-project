from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Member(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    membership_type = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'membership_type': self.membership_type
        }

class Trainer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    specialty = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'specialty': self.specialty
        }

class FitnessClass(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    trainer_id = db.Column(db.Integer, db.ForeignKey('trainer.id'), nullable=False)
    trainer = db.relationship('Trainer')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'trainer_id': self.trainer_id,
            'trainer': self.trainer.to_dict()
        }

class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fitness_class_id = db.Column(db.Integer, db.ForeignKey('fitness_class.id'), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    fitness_class = db.relationship('FitnessClass')

    def to_dict(self):
        return {
            'id': self.id,
            'fitness_class_id': self.fitness_class_id,
            'date': self.date,
            'fitness_class': self.fitness_class.to_dict()
        }

class Attendance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.Integer, db.ForeignKey('member.id'), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    fitness_class_id = db.Column(db.Integer, db.ForeignKey('fitness_class.id'), nullable=False)
    member = db.relationship('Member')
    fitness_class = db.relationship('FitnessClass')

    def to_dict(self):
        return {
            'id': self.id,
            'member_id': self.member_id,
            'date': self.date,
            'fitness_class_id': self.fitness_class_id,
            'member': self.member.to_dict(),
            'fitness_class': self.fitness_class.to_dict()
        }

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.Integer, db.ForeignKey('member.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.String(50), nullable=False)
    member = db.relationship('Member')

    def to_dict(self):
        return {
            'id': self.id,
            'member_id': self.member_id,
            'amount': self.amount,
            'date': self.date,
            'member': self.member.to_dict()
        }
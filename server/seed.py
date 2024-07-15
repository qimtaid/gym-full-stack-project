from app import create_app, db
from models import User, Member, Trainer, FitnessClass, Schedule, Attendance, Payment
from faker import Faker
from datetime import datetime

app = create_app()
faker = Faker()

with app.app_context():
    db.drop_all()
    db.create_all()

    # Creating a default admin user
    admin = User(username='admin', email='admin@example.com')
    admin.set_password('admin')
    db.session.add(admin)
    db.session.commit()  # Commit the admin user

    # Seeding Members
    for _ in range(10):
        try:
            member = Member(name=faker.name(), membership_type=faker.word())
            db.session.add(member)
            db.session.commit()  # Commit the member
            print(f"Added member: {member.name}")  # Print statement

        except Exception as e:
            print(f"Error seeding member data: {e}")
            db.session.rollback()  # Roll back the changes if an error occurs

    # Seeding Trainers
    for _ in range(5):
        try:
            trainer = Trainer(name=faker.name(), specialty=faker.job())
            db.session.add(trainer)
            db.session.commit()  # Commit the trainer
            print(f"Added trainer: {trainer.name}")  # Print statement

        except Exception as e:
            print(f"Error seeding trainer data: {e}")
            db.session.rollback()  # Roll back the changes if an error occurs

    # Seeding Fitness Classes
    trainers = Trainer.query.all()
    for _ in range(5):
        try:
            fitness_class = FitnessClass(name=faker.word(), trainer=faker.random_element(trainers))
            db.session.add(fitness_class)
            db.session.commit()  # Commit the fitness class
            print(f"Added fitness class: {fitness_class.name}")  # Print statement

        except Exception as e:
            print(f"Error seeding fitness class data: {e}")
            db.session.rollback()  # Roll back the changes if an error occurs

    # Seeding Schedules
    fitness_classes = FitnessClass.query.all()
    for _ in range(10):
        try:
            schedule = Schedule(fitness_class=faker.random_element(fitness_classes), date=faker.date())
            db.session.add(schedule)
            db.session.commit()  # Commit the schedule
            print(f"Added schedule for fitness class: {schedule.fitness_class.name} on {schedule.date}")  # Print statement

        except Exception as e:
            print(f"Error seeding schedule data: {e}")
            db.session.rollback()  # Roll back the changes if an error occurs

    # Seeding Attendances
    members = Member.query.all()
    for _ in range(20):
        try:
            attendance = Attendance(member=faker.random_element(members), fitness_class=faker.random_element(fitness_classes))
            db.session.add(attendance)
            db.session.commit()  # Commit the attendance
            print(f"Added attendance for member: {attendance.member.name} to fitness class: {attendance.fitness_class.name}")  # Print statement

        except Exception as e:
            print(f"Error seeding attendance data: {e}")
            db.session.rollback()  # Roll back the changes if an error occurs

    # Seeding Payments
    for _ in range(10):
        try:
            payment = Payment(member=faker.random_element(members), amount=faker.random_number(digits=2), date=faker.date())
            db.session.add(payment)
            db.session.commit()  # Commit the payment
            print(f"Added payment of ${payment.amount} by member: {payment.member.name} on {payment.date}")  # Print statement

        except Exception as e:
            print(f"Error seeding payment data: {e}")
            db.session.rollback()  # Roll back the changes if an error occurs

    print("Database seeded successfully!")

# seed.py

from app import create_app, db
from models import User, Member, Trainer, FitnessClass, Schedule, Attendance, Payment
from faker import Faker

app = create_app()
faker = Faker()

def seed_users():
    # Creating a default admin user
    admin = User(username='admin', email='admin@example.com')
    admin.set_password('admin')
    db.session.add(admin)
    db.session.commit()
    print("Admin user seeded successfully!")

def seed_members():
    for _ in range(10):
        try:
            member = Member(name=faker.name(), membership_type=faker.word())
            db.session.add(member)
            db.session.commit()
            print(f"Added member: {member.name}")
        except Exception as e:
            print(f"Error seeding member data: {e}")
            db.session.rollback()

def seed_trainers():
    for _ in range(5):
        try:
            trainer = Trainer(name=faker.name(), specialty=faker.job())
            db.session.add(trainer)
            db.session.commit()
            print(f"Added trainer: {trainer.name}")
        except Exception as e:
            print(f"Error seeding trainer data: {e}")
            db.session.rollback()

def seed_fitness_classes():
    trainers = Trainer.query.all()
    for _ in range(5):
        try:
            fitness_class = FitnessClass(name=faker.word(), trainer=faker.random_element(trainers))
            db.session.add(fitness_class)
            db.session.commit()
            print(f"Added fitness class: {fitness_class.name}")
        except Exception as e:
            print(f"Error seeding fitness class data: {e}")
            db.session.rollback()

def seed_schedules():
    fitness_classes = FitnessClass.query.all()
    for _ in range(10):
        try:
            schedule = Schedule(fitness_class=faker.random_element(fitness_classes), date=faker.date_between(start_date='-1y', end_date='today').strftime('%Y-%m-%d'))
            db.session.add(schedule)
            db.session.commit()
            print(f"Added schedule for fitness class: {schedule.fitness_class.name} on {schedule.date}")
        except Exception as e:
            print(f"Error seeding schedule data: {e}")
            db.session.rollback()

def seed_attendances():
    members = Member.query.all()
    fitness_classes = FitnessClass.query.all()
    for _ in range(20):
        try:
            attendance = Attendance(
                member=faker.random_element(members),
                fitness_class=faker.random_element(fitness_classes),
                date=faker.date_between(start_date='-1y', end_date='today').strftime('%Y-%m-%d')
            )
            db.session.add(attendance)
            db.session.commit()
            print(f"Added attendance for member: {attendance.member.name} to fitness class: {attendance.fitness_class.name}")
        except Exception as e:
            print(f"Error seeding attendance data: {e}")
            db.session.rollback()

def seed_payments():
    members = Member.query.all()
    for _ in range(10):
        try:
            payment = Payment(
                member=faker.random_element(members),
                amount=faker.random_number(digits=2),
                date=faker.date_between(start_date='-1y', end_date='today').strftime('%Y-%m-%d')
            )
            db.session.add(payment)
            db.session.commit()
            print(f"Added payment of ${payment.amount} by member: {payment.member.name} on {payment.date}")
        except Exception as e:
            print(f"Error seeding payment data: {e}")
            db.session.rollback()

def main():
    with app.app_context():
        db.drop_all()
        db.create_all()

        seed_users()
        seed_members()
        seed_trainers()
        seed_fitness_classes()
        seed_schedules()
        seed_attendances()
        seed_payments()

        print("Database seeded successfully!")

if __name__ == '__main__':
    main()

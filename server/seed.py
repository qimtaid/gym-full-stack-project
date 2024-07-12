from app import create_app, db
from models import User, Member
from faker import Faker

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

    # Seeding other tables with Faker data
    for _ in range(10):
        try:
            member = Member(name=faker.name(), membership_type=faker.word())
            db.session.add(member)
            db.session.commit()  # Commit the member

            print(f"Added member: {member.name}")  # Print statement

        except Exception as e:
            print(f"Error seeding data: {e}")
            db.session.rollback()  # Roll back the changes if an error occurs

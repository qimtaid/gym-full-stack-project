from flask import Blueprint, request, jsonify
from models import User
from app import db
from flask_jwt_extended import create_access_token, jwt_required

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=['POST'])
def register():
    from flask_wtf import FlaskForm
    from wtforms import StringField, PasswordField
    from wtforms.validators import InputRequired

    class RegisterForm(FlaskForm):
        username = StringField('username', validators=[InputRequired()])
        email = StringField('email', validators=[InputRequired()])
        password = PasswordField('password', validators=[InputRequired()])

    form = RegisterForm()
    if form.validate_on_submit():
        username = form.username.data
        email = form.email.data
        password = form.password.data

        if User.query.filter_by(username=username).first():
            return jsonify({"error": "Username already exists"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"error": "Email already exists"}), 400

        new_user = User(username=username, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201

    return jsonify({"error": "Invalid request"}), 400

@bp.route('/login', methods=['POST'])
def login():
    from flask_wtf import FlaskForm
    from wtforms import StringField, PasswordField
    from wtforms.validators import InputRequired

    class LoginForm(FlaskForm):
        username = StringField('username', validators=[InputRequired()])
        password = PasswordField('password', validators=[InputRequired()])

    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.query.filter_by(username=username).first()

        if user is None or not user.check_password(password):
            return jsonify({"error": "Invalid username or password"}), 401

        access_token = create_access_token(identity=username)
        return jsonify({"access_token": access_token}), 200

    return jsonify({"error": "Invalid request"}), 400
import random
from datetime import timedelta

class Config:
    SQLALCHEMY_DATABASE_URI = "sqlite:///gym.db"
    JWT_SECRET_KEY = "fsbdgfnhgvjnvhmvh" + str(random.randint(1, 1000000000000))
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
    SECRET_KEY = "JKSRVHJVFBSRDFV" + str(random.randint(1, 1000000000000))
    SQLALCHEMY_TRACK_MODIFICATIONS = False

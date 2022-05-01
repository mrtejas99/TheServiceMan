'''
MODULE
ORM classes for Job Application
'''

from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

from . import db

import jwt
import datetime

##
### ORM Classes ###
##

class User(db.Model):
    __tablename__ = "user"

    #Columns
    user_id = db.Column(db.Integer, primary_key=True)
    user_email = db.Column(db.String(256), unique=True, nullable=False)
    user_auth_token = db.Column(db.String(256), nullable=True)
    password_hash = db.Column(db.String(256), nullable=False)

    @classmethod
    def authenticate(cls, user_email, user_password):
        #Find user by email address
        user_obj = cls.query.filter_by(user_email = user_email).first()
        if user_obj and check_password_hash(user_obj.password_hash, user_password):
            return user_obj

    @property
    def auth_token(self):
        return {
            "iat": datetime.datetime.utcnow(),
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=3600),
            "user_id": self.user_id,
            "user_email": self.user_email
        }

    def encode_new_token(self, token_secret):
        return jwt.encode(
            self.auth_token,
            token_secret,
            algorithm='HS256'
        )

    def decode_token(self, token_secret):
        return jwt.decode(
            self.user_auth_token,
            token_secret,
            algorithm='HS256'       #Do not trust token's header
        )

class ServiceAd(db.Model):
    __tablename__ = "service_ad"

    #Columns
    ad_id = db.Column(db.Integer, primary_key=True)
    ad_title = db.Column(db.String(200), nullable=False)
    ad_description = db.Column(db.String(400), nullable=True)
    experience = db.Column(db.String(400), nullable=True)
    skill = db.Column(db.String(200), nullable=True)
    location = db.Column(db.String(400), nullable=True)
    category = db.Column(db.String(200), nullable=True)


##
### Database access ORM export ###
##

''' Update this when new classes are added '''
__all__ = [
    'User',
    'ServiceAd'
]
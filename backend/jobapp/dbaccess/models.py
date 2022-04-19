'''
MODULE
ORM classes for Job Application
'''

from flask_sqlalchemy import SQLAlchemy

from . import db


##
### ORM Classes ###
##

class User(db.Model):
    __tablename__ = "user"

    #Columns
    user_id = db.Column(db.Integer, primary_key=True)
    user_email = db.Column(db.String(256), unique=True, nullable=False)
    user_auth_token = db.Column(db.String(256), nullable=True)

    @property
    def is_authenticated(self):
        return len(self.user_auth_token) > 0

    @classmethod
    def authenticate(cls, user_email, user_password):
        #Find user by email address
        user_obj = cls.query.filter_by(user_email = user_email).first()
        if not user_obj:
            return None
        #if not check_password_hash
        return user_obj

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
'''
MODULE
ORM classes for Job Application
'''

from flask_sqlalchemy import SQLAlchemy

from . import db


##
### ORM Classes ###
##

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
    'ServiceAd'
]
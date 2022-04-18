'''
MODULE
Database access layer for JobAPI

'''

from flask_sqlalchemy import SQLAlchemy
import logging

##
### SQL Alchemy initialization ###
##

# Global database object
db = SQLAlchemy()

def init_db(app):
    '''
    Link the SQLAlchemy object with the Flask application
    '''
    db.init_app(app)
    logging.debug("Connecting to database URI \"%s\"" % app.config['SQLALCHEMY_DATABASE_URI'])
    db.create_all(app=app)


##
# Import all model classes
##
from .models import *
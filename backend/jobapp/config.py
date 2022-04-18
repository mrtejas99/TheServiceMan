
import os
from decouple import config

class Config(object):
    basedir = os.path.abspath(os.path.dirname(__file__))
    SECRET_KEY = config('SECRET_KEY', default='{ }{ } secret { }{ }')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    #NEVER ALLOW PRODUCTION DATABASE IN DEV ENVIRONMENT!!!
    #Using dev database by default, in production config we will change to prod database
    SQLALCHEMY_DATABASE_URI = config('DEV_DATABASE_URI', default='sqlite:///:memory:')

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False
    SESSION_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_DURATION = 3600
    #Use Production database
    SQLALCHEMY_DATABASE_URI = config('DATABASE_URI')

class DebugConfig(Config):
    DEBUG = True

config_dict = {
    'Development': DevelopmentConfig,
    'Production': ProductionConfig,
    'Debug': DebugConfig
}

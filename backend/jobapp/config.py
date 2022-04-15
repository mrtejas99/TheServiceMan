
import os
from decouple import config

class Config(object):
    basedir = os.path.abspath(os.path.dirname(__file__))
    SECRET_KEY = config('SECRET_KEY', default='{ }{ } secret { }{ }')
    DATABASE_STRING = config('DATABASE_STRING')

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False
    SESSION_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_DURATION = 3600

class DebugConfig(Config):
    DEBUG = True

config_dict = {
    'Development': DevelopmentConfig,
    'Production': ProductionConfig,
    'Debug': DebugConfig
}

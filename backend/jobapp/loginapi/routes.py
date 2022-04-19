
from flask_restful import Api
from .resources import *

def init_api(api : Api):
    api.add_resource(LoginHandler, '/user/login')

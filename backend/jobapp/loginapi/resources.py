
from jobapp.login import login_manager
from flask_restful import Resource
from flask import request

from jobapp.dbaccess import User

@login_manager.user_loader
def get_user(user_id):
    User.query.get(user_id)

class LoginHandler(Resource):
    def get(self):
        return {}
    def post(self):
        print(request.json)

__all__ = [
    'LoginHandler'
]
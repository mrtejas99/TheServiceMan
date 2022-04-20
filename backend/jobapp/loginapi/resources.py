
from jobapp.login import login_manager
from flask_restful import Resource

import flask
import jwt
import traceback

from jobapp.dbaccess import User

from . import AuthToken

@login_manager.user_loader
def get_user(user_id):
    return User.query.get(user_id)

class LoginHandler(Resource):
    def post(self):
        user_email = flask.request.json.get('user_email')
        user_password = flask.request.json.get('user_password')
        if user_email is None or user_password is None:
            flask.abort(400, "Need parameters 'user_email' and 'user_password' in a JSON body")
        return self.__user_auth(user_email, user_password)

    def __user_auth(self, user_email : str, user_password : str) -> AuthToken:
        user = User.authenticate(user_email, user_password)
        secret = flask.current_app.config['SECRET_KEY']
        auth_tok = None
        if not user:
            flask.abort(403, "Authentication failed: Email address or password is incorrect")

        try:
            auth_tok = user.decode_token(secret)
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, jwt.DecodeError) as e:
            traceback.print_exc()
            auth_tok = user.encode_new_token(secret).decode('UTF-8')
        finally:
            if auth_tok:
                return AuthToken(token = auth_tok)
            else:
                flask.abort(403, "Authentication token could not be verified")

class UserRegistrationHandler(Resource):
    def get(self):
        return {}

__all__ = [
    'LoginHandler',
    'UserRegistrationHandler'
]

from flask_login import LoginManager
login_manager = LoginManager()

def init_login(app):
    login_manager.init_app(app)
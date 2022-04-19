
import flask
from flask_restful import Api as RestfulAPI
from flask_cors import CORS

from decouple import config as deconfig, Csv

from .config import config_dict

import importlib

from .log import init_logger
from .dbaccess import init_db
from .login import init_login

LOG_LEVEL = deconfig('LOG_LEVEL', 'INFO')

API_BASE = deconfig('API_BASE')
API_ENABLED = deconfig('API_ENABLED', default='', cast=Csv(post_process=list))

root_logger = init_logger(LOG_LEVEL)

def getConfigObject(app : flask.Flask):
    flask_env : str = app.config.get('ENV')
    try:
        return config_dict[flask_env.capitalize()]
    except KeyError:
        exit('Error: Invalid <ENV> "%s" for Flask. Expected values [%s]' % (flask_env, ', '.join(config_dict.keys())))

def create_app():
    app = flask.Flask(__name__)
    app.config.from_object(getConfigObject(app))
    root_logger.info("APP starting in '%s' environment" % app.config.get('ENV'))

    #Initialize APIs
    api = RestfulAPI(app, prefix=API_BASE)
    #Cross-origin requests are allowed
    CORS(app, resources = {(API_BASE + '/*'): {"origins": "*"}}, send_wildcard = True)

    #Initialize database
    init_db(app)

    #Initialize Login manager
    init_login(app)

    #Load API endpoints
    for api_name in API_ENABLED:
        api_mod = importlib.import_module('.'.join([__name__, api_name, 'routes']))
        api_mod.init_api(api)
        root_logger.info("Loaded routes for API: %s" % api_name)

    return app

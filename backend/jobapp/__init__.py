
import flask
from flask_restful import Api as RestfulAPI
from flask_cors import CORS

import importlib

from decouple import config as deconfig, Csv

from .log import init_logger
from .config import config_dict

root_logger = init_logger()

API_BASE = deconfig('API_BASE')
API_ENABLED = deconfig('API_ENABLED', default='', cast=Csv(post_process=list))

def getConfigObject(app : flask.Flask):
    flask_env : str = app.config.get('ENV')
    try:
        return config_dict[flask_env.capitalize()]
    except KeyError:
        exit('Error: Invalid <ENV> "%s" for Flask. Expected values [%s]' % (flask_env, ', '.join(config_dict.keys())))

def create_app():
    app = flask.Flask(__name__)
    app.config.from_object(getConfigObject(app))
    root_logger.info("APP starting in %s environment" % app.config.get('ENV'))

    #Initialize APIs
    api = RestfulAPI(app)
    #Cross-origin requests are allowed
    CORS(app, resources = {(API_BASE + '/*'): {"origins": "*"}}, send_wildcard = True)

    #Load API endpoints
    for api_name in API_ENABLED:
        api_mod = importlib.import_module('.'.join([__name__, api_name, 'routes']))
        api_mod.init_api(api)
        root_logger.info("Loaded routes for API: %s" % api_name)

    return app
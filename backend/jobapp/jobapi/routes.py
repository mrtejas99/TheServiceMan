
from . import ServiceAd
from decouple import config

API_BASE = config("API_BASE", default='')

def init_api(api):
    api.add_resource(ServiceAd, API_BASE + '/service/ads')

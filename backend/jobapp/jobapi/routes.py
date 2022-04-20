
from flask_restful import Api
from .resources import *

def init_api(api : Api):
    api.add_resource(ServiceAd, '/service/ads')
    api.add_resource(MasterFilterCategories, '/master/filters/categories')
    api.add_resource(MasterFilterLocations, '/master/filters/locations')

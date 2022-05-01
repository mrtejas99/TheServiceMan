
import flask
from flask_restful import Resource

from typing import List

#Database object
from jobapp.dbaccess import db

#Database models
import jobapp.dbaccess.models as JobModels

from . import (ServiceAdTile, FilterCategory, FilterLocation)

##
### Resources ###
##

class ServiceAd(Resource):
    def get(self) -> List[ServiceAdTile]:
        jobdata = JobModels.ServiceAd.query.all()
        return [ServiceAdTile(jobtile) for jobtile in jobdata]

class MasterFilterCategories(Resource):
    def get(self) -> List[FilterCategory]:
        return [
            FilterCategory(category_id = 1, category_name = "Programming"),
            FilterCategory(category_id = 2, category_name = "Plumbing"),
            FilterCategory(category_id = 3, category_name = "Carpentry")
        ]

class MasterFilterLocations(Resource):
    def get(self) -> List[FilterLocation]:
        return [
            FilterLocation(location_id = 1, location_city_name = "Panaji", location_gps_coordinates = (15.4767319, 73.7953729)),
            FilterLocation(location_id = 2, location_city_name = "Margao", location_gps_coordinates = (15.2856166, 73.9516645)),
            FilterLocation(location_id = 3, location_city_name = "Mapusa", location_gps_coordinates = (15.6016127, 73.7949736))
        ]

__all__ = [
    'ServiceAd',
    'MasterFilterCategories',
    'MasterFilterLocations'
]
'''
MODULE
Main API specification for Job Application
Contains most Business logic needed for the app

'''

##
### Configuration ###
##


##
### Utility functions ###
##

##
### Data objects ###
##

from typing import Tuple

class ServiceAdTile(dict):
    def __init__(self, ad_data, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self['ad_id'] = ad_data.ad_id
        self['ad_title'] = ad_data.ad_title
        self['ad_description'] = ad_data.ad_description
        self['experience'] = ad_data.experience
        self['skill'] = ad_data.skill
        self['location'] = ad_data.location
        self['category'] = ad_data.category

class FilterCategory(dict):
    def __init__(self, category_id : int, category_name : str, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self['category_id'] = category_id
        self['category_name'] = category_name

class FilterLocation(dict):
    def __init__(self, location_id : int, location_city_name : str, location_gps_coordinates : Tuple[float, float], *args, **kwargs):
        super().__init__(*args, **kwargs)
        self['location_id'] = location_id
        self['location_city_name'] = location_city_name
        self['location_gps_coordinates'] = location_gps_coordinates

##
### Import all resource classes ###
##
from .resources import *
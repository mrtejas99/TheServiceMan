'''
MODULE
API specification for Login logic

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

class AuthToken(dict):
    def __init__(self, token : str = '', *args, **kwargs):
        super().__init__(*args, **kwargs)
        self['token'] = token

##
### Import all resource classes ###
##
from .resources import *

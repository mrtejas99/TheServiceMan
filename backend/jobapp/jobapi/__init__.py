'''
MODULE
Main API specification for Job Application
Contains most Business logic needed for the app

'''

import flask
from flask_restful import Resource

from jobapp.log import Loggable

#Database object
from jobapp.dbaccess import db

#Database models
import jobapp.dbaccess.models as JobModels

##
### Configuration ###
##


##
### Utility functions ###
##


##
### Resources ###
##

class ServiceAd(Resource, Loggable):
    def get(self):
        new_ad = JobModels.ServiceAd(
            ad_title="Test",
            ad_description="testing",
            experience="Good",
            skill="ac",
            location="a,2",
            category="C"
        )

        jobdata = JobModels.ServiceAd.query.all()
        #db.session.add(new_ad)
        #db.session.commit()
        return [
            {
                "ad_id": row.ad_id,
                "ad_title": row.ad_title,
                "ad_description": row.ad_description,
                "experience": row.experience,
                "skill": row.skill,
                "location": row.location,
                "category": row.category
            }
            for row in jobdata
        ]

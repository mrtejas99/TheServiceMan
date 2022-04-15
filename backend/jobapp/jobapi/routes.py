
from . import SampleImageBatch, SampleJob
from decouple import config

API_BASE = config("API_BASE")

def init_api(api):
    api.add_resource(SampleImageBatch, API_BASE + '/sample/images')
    api.add_resource(SampleJob, API_BASE + '/sample')


import flask
from flask_restful import Resource
from decouple import config

from io import BytesIO

import cv2
import numpy as np

from jobapp.db import BezierDB
from jobapp.log import Loggable

#Configuration
SAMPLE_MAX_LIMIT = config("SAMPLE_MAX_LIMIT", cast=int)
SAMPLE_FORMAT = config("SAMPLE_FORMAT")

#Utility functions
isint = lambda x: isinstance(x, int)
loadimg = lambda blob: cv2.imdecode(blob, cv2.IMREAD_ANYCOLOR | cv2.IMREAD_ANYDEPTH)

def imageScaleUniform(img, width, height):
    h, w = img.shape[:2]
    ratio = w / h

    #Scaling image algorithm
    if h > height or w > width:
        #Shrinking
        interp = cv2.INTER_AREA
    else:
        #Stretching
        interp = cv2.INTER_CUBIC

    return cv2.resize(img, (round(height * ratio), height), interpolation=interp)

def maxImageDimCV(images : list):
    return (max([i.shape[d] for i in images]) for d in range(1,-1,-1))

def maxImageDimDB(images : list):
    if len(images) == 0: return 0, 0
    return max([i['image_width'] for i in images]), max([i['image_height'] for i in images])

def dim2dict(w, h):
    return {
        'width': w,
        'height': h
    }


#Resources

class SampleImageBatch(Resource, Loggable):
    '''
    Generate a stack of images from given image ID(s) (which is ordered, and preserved in output)
    '''
    def post(self):
        id_list = flask.request.json.get('id')

        if id_list is None:
            flask.abort(400, "Required field 'id' missing")
        if isinstance(id_list, int):
            id_list = [id_list]
        elif not isinstance(id_list, list) or not (isinstance(id_list, list) and all(map(isint, id_list))):
            flask.abort(400, "Field 'id' must be an int or a list of int")
        elif len(id_list) == 0:
            flask.abort(400, "Need at least one image id to be provided in the 'id' field")
        elif len(id_list) > SAMPLE_MAX_LIMIT:
            flask.abort(400, "Too many images requested in this sample. Limit to %d per request." % SAMPLE_MAX_LIMIT)

        id_list_filtered = list(dict.fromkeys(id_list))
        if len(id_list_filtered) != len(id_list):
            self.logger.warn("Duplicate ids were present in request, and were removed")

        #Fetch requested images
        batch_img_data : list = BezierDB.getImageData(id_list_filtered)

        if len(batch_img_data) == 0:
            flask.abort(404, "The provided image id(s) are not present on the server")
        elif len(batch_img_data) != len(id_list_filtered):
            self.logger.warn("Fetched fewer than requested number of images: %d vs %d" % (
                len(batch_img_data), len(id_list)
            ))

        #Sort by requested order
        batch_img_data.sort(key = lambda row: id_list_filtered.index(row['image_id']))

        #Decode the images
        batch_img = list(map(loadimg, [
            np.asarray(bytearray(x['image_data']), dtype="uint8")
            for x in batch_img_data
        ]))

        #Give all images the same height
        max_w, max_h = maxImageDimCV(batch_img)
        batch_img_scaled = list(map(lambda i: imageScaleUniform(i, max_w, max_h), batch_img))

        #Stack horizontally
        batch_stack = np.hstack(batch_img_scaled)

        is_success, buffer = cv2.imencode(SAMPLE_FORMAT, batch_stack)
        if is_success:
            io_buf = BytesIO(buffer)
            return flask.Response(io_buf, mimetype='image/png')

        flask.abort(500, "Failed to convert images to a batch")

class BZJobImage(dict):
    def __init__(self, image_data):
        super().__init__()
        self['image_id'] = image_data['image_id']
        self['image_width'] = image_data['image_width']
        self['image_height'] = image_data['image_height']

class BZJob(dict):
    def __init__(self, img_data_list : list):
        super().__init__()
        self['image_count'] = len(img_data_list)
        self['image_format'] = SAMPLE_FORMAT
        self['image_max_dim'] = dim2dict(*maxImageDimDB(img_data_list))
        self['images'] = [BZJobImage(i) for i in img_data_list]

class SampleJob(Resource, Loggable):
    def get(self):
        return BZJob(BezierDB.getRandomImages(int(flask.request.args.get('count', 5))))

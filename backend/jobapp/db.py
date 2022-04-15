
from contextlib import contextmanager
from typing import List, Sized
from decouple import config
from flask import current_app, has_app_context

#TODO: Change to SQLAlchemy
import sqlite3 as sql
from sqlite3 import IntegrityError, Cursor

class BezierDB:
    @contextmanager
    def Connection():
        if has_app_context():
            dbconfig = {
                'database': current_app.config['DATABASE_FILE']
            }
        else:
            dbconfig = {
                'database': config('DATABASE_FILE')
            }
        _con = sql.connect(**dbconfig)
        _con.row_factory = sql.Row
        try:
            yield _con
        finally:
            _con.close()

    @classmethod
    def init_db(cls):
        with cls.Connection() as conn:
            #with open('templates/bezier.sql') as f:
                #conn.executescript(f.read())
            pass

    @classmethod
    def getRandomImages(cls, count : int):
        with cls.Connection() as conn:
            cur = conn.cursor()
            cur.execute("select im.image_id, im.image_width, im.image_height from image im order by random() limit ?", (count,))
            return cur.fetchall()

    @classmethod
    def getImageData(cls, image_ids : Sized) -> List:
        with cls.Connection() as conn:
            cur = conn.cursor()
            param_ids_format = ','.join(['?'] * len(image_ids))
            cur.execute("select im.image_id, im.image_format, im.image_data, im.image_width, im.image_height from image im where im.image_id in (%s)" % param_ids_format, image_ids)
            return cur.fetchall()

    @classmethod
    def insertDict(cls, table : str, data : dict):
        with cls.Connection() as conn:
            cur = conn.cursor()
            cls.insertDictCur(cur, table, data)
            conn.commit()

    @classmethod
    def insertDictCur(cls, cur : Cursor, table : str, data : dict):
        param_fields_format = ','.join(['?'] * len(data))
        cur.execute("insert into %s (%s) values (%s)" % (table, ','.join(data.keys()), param_fields_format), [*data.values()])

if __name__ == "__main__":
    BezierDB.init_db()

from jobapp import create_app
from dotenv import load_dotenv
from jobapp.dbaccess import db
from jobapp.dbaccess.models import *

from werkzeug.security import generate_password_hash

load_dotenv()

if __name__ == '__main__':
    app = create_app()
    pw_hash_method = "pbkdf2:sha1"
    pw_salt_len = 14
    user_list = [User(**x) for x in [
        {
            'user_email': 'abc@123.com',
            'password_hash': generate_password_hash('aaaabbbb', method=pw_hash_method, salt_length=pw_salt_len),
        },
        {
            'user_email': 'hello@123.com',
            'password_hash': generate_password_hash('12345678', method=pw_hash_method, salt_length=pw_salt_len),
        },
    ]]

    with app.app_context():
        try:
            db.session.add_all(user_list)
        except:
            pass
        db.session.commit()
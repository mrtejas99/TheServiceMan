
'''
Best to run the application using a WSGI gateway like Gunicorn or uWSGI
along with a good Web server. But make sure that the correct Environment is loaded
either from the .env file or passed through the Environment Variables.
'''

from jobapp import create_app
from dotenv import load_dotenv

load_dotenv()

app = create_app()

if __name__ == '__main__':
    PORT = 5001
    app.logger.info("Starting development server on port %d" % PORT)
    app.run(port = PORT, debug=app.config['DEBUG'], host = '0.0.0.0')
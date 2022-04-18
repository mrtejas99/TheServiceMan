
'''
Best to run the application using a WSGI gateway like Gunicorn or uWSGI
along with a good Web server. But make sure that the correct Environment is loaded
either from the .env file or passed through the Environment Variables.
'''

from jobapp import create_app
from dotenv import load_dotenv
from argparse import ArgumentParser

load_dotenv()

app = create_app()

if __name__ == '__main__':
    DEFAULT_PORT = 5001

    parser = ArgumentParser()
    parser.add_argument('-p', "--port", type=int, default=DEFAULT_PORT, help="Port number to listen to")
    args = parser.parse_args()

    app.logger.info("Starting development server on port %d" % args.port)
    app.run(port = args.port, debug=app.config['DEBUG'], host = '0.0.0.0')
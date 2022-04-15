import logging
import os
from decouple import config

LOG_LEVEL = config('LOG_LEVEL', 'INFO')
LOG_GOOD_FORMAT = "[%(levelname)s] [%(name)s] (%(filename)s:%(lineno)d) %(message)s"

def ensure_log_path(path):
    '''
    Creates directories for the log file (if they don't exist), making sure the file will be able to be created
    inside the path
    '''
    os.makedirs(os.path.dirname(path), exist_ok=True)
    return path

class Loggable:
    '''
    Declares a class as being loggable by creating a logger object the class can use
    '''
    logger = logging.getLogger(__name__)

class ColoredFormatter(logging.Formatter):
    #Default formatted color, replaces the level name with a colored version
    FORMAT = LOG_GOOD_FORMAT.replace('%(levelname)s', '%(ansi_colorlevel)s%(levelname)s%(ansi_end)s')

    FORMAT_COLORS = {
        'black': 0, 'red': 1, 'green': 2, 'yellow': 3, 'blue': 4, 'magenta': 5, 'cyan': 6, 'white': 7,
        'reset_seq': "\033[0m",
        'color_seq': "\033[1;%dm",
        'bold_seq': "\033[1m"
    }
    LEVEL_COLORS = {
        'WARNING': FORMAT_COLORS['yellow'],
        'INFO': FORMAT_COLORS['green'],
        'DEBUG': FORMAT_COLORS['blue'],
        'CRITICAL': FORMAT_COLORS['yellow'],
        'ERROR': FORMAT_COLORS['red']
    }

    def __init__(self, *args, fmt : str = None, use_color : bool = True, **kwargs):
        if fmt is None: fmt = self.FORMAT
        logging.Formatter.__init__(self, *args, fmt = fmt, **kwargs)
        self.use_color = use_color

    #Override the format call
    def format(self, record : logging.LogRecord):
        if self.use_color:
            #If we need to show colors, we can preset the format attributes for the record
            if record.levelname in self.LEVEL_COLORS:
                setattr(record, 'ansi_colorlevel', self.FORMAT_COLORS['color_seq'] % (30 + self.LEVEL_COLORS[record.levelname]))
            else:
                setattr(record, 'ansi_colorlevel', '')
            setattr(record, 'ansi_bold', self.FORMAT_COLORS['bold_seq'])
            setattr(record, 'ansi_end', self.FORMAT_COLORS['reset_seq'])
        else:
            #Otherwise, leave it blank so as to not raise an exception for missing attributes
            setattr(record, 'ansi_colorlevel', '')
            setattr(record, 'ansi_bold', '')
            setattr(record, 'ansi_end', '')
        return logging.Formatter.format(self, record)

def init_logger():
    _root = logging.getLogger()
    _root.setLevel(LOG_LEVEL)
    _log_stdout = logging.StreamHandler()
    _log_stdout.setFormatter(ColoredFormatter())
    _log_stdout.setLevel(logging.INFO)
    _root.addHandler(_log_stdout)
    return _root
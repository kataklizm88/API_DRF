"""
Settings to run from host
"""

from .base import *
DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'test_base',
        'USER': 'vlad',
        'PASSWORD': '555',
        'HOST': '127.0.0.1',
        'PORT': '54326'
    }
}

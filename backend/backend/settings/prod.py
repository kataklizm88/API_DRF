"""
Settings to run from container
"""

from .base import *
DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'test_base',
        'USER': 'vlad',
        'PASSWORD': '555',
        'HOST': 'db',
        'PORT': '5432'
    }
}

# -*- coding: utf-8 -*-

from setuptools import setup, find_packages


with open('LICENSE') as f:
    license = f.read()

setup(
    name='sample',
    version='0.1.0',
    description='Sample package for Python-Guide.org',
    long_description='AI',
    author='Luke Silva, Harsil Patel, Aichi Tsuchihira',
    author_email='lsil0001@student.monash.edu',
    url='https://github.com/delwp-species-modelling/frontend',
    license=license,
    packages=find_packages(exclude=('tests', 'docs'))
)


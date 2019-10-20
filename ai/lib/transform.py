"""
  lib/transform.py

  FIT3162 - Team 10 - Final Year Computer Science Project
  Copyright Luke Silva, Aichi Tsuchihira, Harsil Patel 2019

  Script containing method to convert geographical coordinates to and from (latitude, longitude)
   to vicmap coordinates
"""

from osgeo import ogr, osr, gdal
import pandas as pd


latlong = osr.SpatialReference()
latlong.ImportFromEPSG(4326)

vicmap = osr.SpatialReference()
vicmap.ImportFromEPSG(3111)

LL2VMTransform = osr.CoordinateTransformation(latlong, vicmap)
VM2LLTransform = osr.CoordinateTransformation(vicmap, latlong)


def latlong2vicmap(coords):
    """
    Method to convert latitude, longitude to vicmap coordinates
    :param coords: latitude, longitude to be vicmap coordinates
    :return: the converted vicmap coordinates
    """
    geo = ogr.Geometry(ogr.wkbPoint)
    geo.AddPoint(coords[0], coords[1])

    geo.Transform(LL2VMTransform)
    point = geo.GetPoint(0)

    return (int(point[0]), int(point[1]))


def vicmap2latlong(coords):
    """
    Method to convert vicmap coordinates to latitude longtitude
    :param coords: the vicmap coordinates to be converted to lat lng
    :return: the converted lat lng
    """
    geo = ogr.Geometry(ogr.wkbPoint)
    geo.AddPoint(coords[0], coords[1])

    geo.Transform(VM2LLTransform)
    point = geo.GetPoint(0)

    return (point[0], point[1])


def add_vic_coordinates(data):
    """
    Method to add vicmap coordinates columns to the dataset
    :param data: dataframe to be updated with vicmap coordinates
    :return: dataframe updated with the vicmap coordinates
    """
    # data = pandas dataframe object
    data[["vic_x", "vic_y"]] = data.apply(
        lambda row: pd.Series(latlong2vicmap((row["latitude"], row["longitude"]))),
        axis=1,
    )
    return data

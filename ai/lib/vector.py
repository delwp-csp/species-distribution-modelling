"""
  lib/vector.py

  FIT3162 - Team 10 - Final Year Computer Science Project
  Copyright Luke Silva, Aichi Tsuchihira, Harsil Patel 2019

  Script containing the class to process vector files to get environment data
"""

from osgeo import ogr, osr, gdal
from pathlib import Path
import pandas as pd


def conv_to_point(row):
    """
    Method to create a point series from vic coordinates
    :param row: dataset's row to be updated
    :return: the point series
    """
    geo = ogr.Geometry(ogr.wkbPoint)
    geo.AddPoint(int(row["vic_x"]), int(row["vic_y"]))
    geo.InShape = False
    return geo


def ProcessPoints(dataframe, fname):
    """
    Method to process vector dataset's points and update the dataframe
    :param dataframe: dateframe to be update with the vector file's env data
    :param fname: vector file containing the env data
    :return: updated dataframe with vector file's env data
    """
    shapefile = ogr.Open(fname)
    layer = shapefile.GetLayer()

    column = Path(fname).stem

    points_series = dataframe.apply(conv_to_point, axis=1)
    points = points_series.values

    for feature in layer:
        geo = feature.GetGeometryRef()
        for point in points:
            if point.Within(geo):
                point.InShape = True

    series = pd.Series(map(lambda x: x.InShape, points), index=points_series.index)
    retdf = pd.DataFrame()
    retdf[column] = series

    return retdf


if __name__ == "__main__":

    result = ProcessPoints(
        # Melbourne Coordinate, Ocean Coordinate
        [(2496750, 2409712), (2488155, 2386267)],
        "../raw_dataset/VMLITE/VMLITE_BUILT_UP_AREA.shp",
    )

    print(result)
    print("Should be True, False")

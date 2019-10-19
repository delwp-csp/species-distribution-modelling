from osgeo import ogr, osr, gdal
import pandas as pd


latlong = osr.SpatialReference()
latlong.ImportFromEPSG(4326)

vicmap = osr.SpatialReference()
vicmap.ImportFromEPSG(3111)

LL2VMTransform = osr.CoordinateTransformation(latlong, vicmap)
VM2LLTransform = osr.CoordinateTransformation(vicmap, latlong)


def latlong2vicmap(coords):
    geo = ogr.Geometry(ogr.wkbPoint)
    geo.AddPoint(coords[0], coords[1])

    geo.Transform(LL2VMTransform)
    point = geo.GetPoint(0)

    return (int(point[0]), int(point[1]))


def vicmap2latlong(coords):
    geo = ogr.Geometry(ogr.wkbPoint)
    geo.AddPoint(coords[0], coords[1])

    geo.Transform(VM2LLTransform)
    point = geo.GetPoint(0)

    return (point[0], point[1])


def add_vic_coordinates(data):
    # data = pandas dataframe object
    data[["vic_x", "vic_y"]] = data.apply(
        lambda row: pd.Series(latlong2vicmap((row["latitude"], row["longitude"]))),
        axis=1,
    )
    return data

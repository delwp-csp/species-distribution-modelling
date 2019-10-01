from osgeo import ogr, osr, gdal
from pathlib import Path
import pandas as pd

def conv_to_point(row):
    geo = ogr.Geometry(ogr.wkbPoint)
    geo.AddPoint(row['vic_x'], row['vic_y'])
    geo.InShape = False
    return geo

def ProcessPoints(dataframe, fname):
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
    dataframe[column] = series

    return dataframe


if __name__ == "__main__":
    
    result = ProcessPoints(
        # Melbourne Coordinate, Ocean Coordinate
        [(2496750, 2409712),  (2488155, 2386267)], 
        '../raw_dataset/VMLITE/VMLITE_BUILT_UP_AREA.shp'
    )

    print(result)
    print("Should be True, False")
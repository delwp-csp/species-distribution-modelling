from osgeo import ogr, osr, gdal
from os.path import basename

def ProcessPoints(points, fname):
    shapefile = ogr.Open(fname)
    layer = shapefile.GetLayer()
    new_points = []

    for point in points:
        geo = ogr.Geometry(ogr.wkbPoint)
        geo.AddPoint(point[0], point[1])
        geo.InShape = False
        new_points.append(geo)

    for feature in layer:
        geo = feature.GetGeometryRef()
        for point in new_points:
            if point.Within(geo):
                point.InShape = True

    return list(map(lambda x: x.InShape, new_points))


if __name__ == "__main__":
    
    result = ProcessPoints(
        # Melbourne Coordinate, Ocean Coordinate
        [(2496750, 2409712),  (2488155, 2386267)], 
        '../raw_dataset/VMLITE/VMLITE_BUILT_UP_AREA.shp'
    )

    print(result)
    print("Should be True, False")
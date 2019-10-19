"""
datatest.py

    An initial attempt at grabbing environment data from raster and vector files
    Not used in the final project, simply was a learning excersize.

"""

import sys
try:
    from osgeo import ogr, osr, gdal
except:
    sys.exit('ERROR: cannot find GDAL/OGR modules')

import csv


shapefile = ogr.Open("../raw_dataset/VMLITE/VMLITE_BUILT_UP_AREA.shp")

layer = shapefile.GetLayer()


latlong = osr.SpatialReference()
latlong.ImportFromEPSG(4326)

vicmap = osr.SpatialReference()
vicmap.ImportFromEPSG(3111)

melbourne = ogr.Geometry(ogr.wkbPoint)
melbourne.AddPoint(-37.8136, 144.9631)

bay = ogr.Geometry(ogr.wkbPoint)
bay.AddPoint(-38.024761, 144.865100)

transform = osr.CoordinateTransformation(latlong, vicmap)

#print("Lat long")
#print(melbourne.ExportToWkt())
#print(bay.ExportToWkt())

melbourne.Transform(transform)
bay.Transform(transform)

#print("Transformed")
#print(melbourne.ExportToWkt())
#print(bay.ExportToWkt())

melbourne.InBuiltUpArea = False
bay.InBuiltUpArea = False


points = []
print("Loading data...")
with open('../dataset/Common_Beard-heath.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        point = ogr.Geometry(ogr.wkbPoint)
        point.AddPoint(float(row['LATITUDEDD_NUM']), float(row['LONGITUDEDD_NUM']))
        #print(point.ExportToWkt())
        point.Transform(transform)
        #print(point.ExportToWkt())
        point.InBuiltUpArea = False
        points.append(point)

#points.append(melbourne)
#points.append(bay)

print("Checking if in built up area")
for feature in layer:
    geom = feature.GetGeometryRef()
    for point in points:
        if point.Within(geom):
            point.InBuiltUpArea = True


idx = 0
for point in points:
    if (point.InBuiltUpArea):
        print("Point #" + str(idx) + " is in a built up area")
    else:
        pass
        #print("Point #" + str(idx) + " is not in a built up area")

    idx = idx + 1
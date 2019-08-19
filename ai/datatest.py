import sys
try:
    from osgeo import ogr, osr, gdal
except:
    sys.exit('ERROR: cannot find GDAL/OGR modules')




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

print("Lat long")
print(melbourne.ExportToWkt())
print(bay.ExportToWkt())

melbourne.Transform(transform)
bay.Transform(transform)

print("Transformed")
print(melbourne.ExportToWkt())
print(bay.ExportToWkt())

melbourneBuiltUp = False
bayBuiltUp = False

for feature in layer:
    geom = feature.GetGeometryRef()

    if melbourne.Within(geom): melbourneBuiltUp = True
    if bay.Within(geom): bayBuiltUp = True

print("Melbourne is " + ("" if melbourneBuiltUp else "not ") + "in a built up area")
print("The ocean is " + ("" if bayBuiltUp else "not ") + "in a built up area")

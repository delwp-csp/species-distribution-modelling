import sys
try:
    from osgeo import ogr, osr, gdal
except:
    sys.exit('ERROR: cannot find GDAL/OGR modules')


gdal.UseExceptions()




try:
    src_ds = gdal.Open("../raw_dataset/MaxTemp/sept2014JanMaxTemp.ers")
except RuntimeError as  e:
    print('Unable to open sept2014JanMaxTemp.ers')
    print(e)
    sys.exit(1)


print(src_ds.RasterCount)

srcband = src_ds.GetRasterBand(1)
print(srcband)

if srcband.GetMinimum() is None or srcband.GetMaximum()is None:
    srcband.ComputeStatistics(0)
    print("Statistics computed.")

print ("[ NO DATA VALUE ] = ", srcband.GetNoDataValue())
print ("[ MIN ] = ", srcband.GetMinimum())
print ("[ MAX ] = ", srcband.GetMaximum())
print ("[ SCALE ] = ", srcband.GetScale())
print( "[ UNIT TYPE ] = ", srcband.GetUnitType())

print((
src_ds.RasterXSize,
src_ds.RasterYSize
))

gt = src_ds.GetGeoTransform()
print(gt)
#Band 1: sept2014JanMaxTemp: 353.61
#2949238
#1969702

# Temp: 281.6726
# x 2341512
# y 2491520
my = 2949238
mx = 1969702

px = int((mx - gt[0]) / gt[1]) #x pixel
py = int((my - gt[3]) / gt[5]) #y pixel
print(px, py)

intval=srcband.ReadAsArray(px,py,1,1)

print(intval[0][0])
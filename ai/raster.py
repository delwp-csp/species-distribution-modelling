from osgeo import ogr, osr, gdal
from os.path import basename

class RasterProcessor():
    def __init__(self, fname, band = 1):
        bn = basename(fname)
        print("Opening {}...".format(fname))
        self.data_source = gdal.Open(fname)
        print("{} has {} band(s)".format(bn, self.data_source.RasterCount))

        self.band = self.data_source.GetRasterBand(1)

        if self.band.GetMinimum() is None or self.band.GetMaximum() is None:
            print("Computing statistics for {}".format(bn))
            self.band.ComputeStatistics(0)

        print("{} is {}x{}".format(bn, self.data_source.RasterXSize, self.data_source.RasterYSize))

        self.geo_transform = self.data_source.GetGeoTransform()

    def GetValueAt(self, x, y):
        px = int((x - self.geo_transform[0]) / self.geo_transform[1])
        py = int((y - self.geo_transform[3]) / self.geo_transform[5])

        return self.band.ReadAsArray(px, py, 1, 1)[0][0]

if __name__ == "__main__":
    r = RasterProcessor('../raw_dataset/sept2014JanMaxTemp/sept2014JanMaxTemp.ers')
    print(r.GetValueAt(2341512,2491520))
    print("{} should match ^^".format(281.6726))

    print()
    print(r.GetValueAt(1969702, 2949238))
    print("{} should match ^^".format(353.61))

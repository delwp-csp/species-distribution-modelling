from osgeo import ogr, osr, gdal
from os.path import basename


class RasterProcessor:
    # fname must be a .ers file
    def __init__(self, fname):
        bn = basename(fname)
        # print("Opening {}...".format(fname))
        self.data_source = gdal.Open(fname)
        # print("{} has {} band(s)".format(bn, self.data_source.RasterCount))

        self.bands = [
            self.data_source.GetRasterBand(band)
            for band in range(1, self.data_source.RasterCount + 1)
        ]

        if self.bands[0].GetMinimum() is None or self.bands[0].GetMaximum() is None:
            # 	print("Computing statistics for {}".format(bn))
            self.bands[0].ComputeStatistics(0)

        # print("{} is {}x{}".format(bn, self.data_source.RasterXSize, self.data_source.RasterYSize))

        self.geo_transform = self.data_source.GetGeoTransform()

    def GetValueAt(self, x, y, bandIndex=0):
        px = int((x - self.geo_transform[0]) / self.geo_transform[1])
        py = int((y - self.geo_transform[3]) / self.geo_transform[5])
        try:
            band = self.bands[bandIndex]
        except:
            print(bandIndex)
            raise
        try:
            array = band.ReadAsArray(px, py, 1, 1)
            value = array[0][0]
        except:
            print(x, y)
            print(self.geo_transform)
            raise

        return value


if __name__ == "__main__":
    r = RasterProcessor(
        "../raw_dataset/SummerLandsat75_300_900m/SummerLandsat75_300_900m"
    )
    print(r.GetValueAt(2341512, 2491520))
    print("{} should match ^^".format(281.6726))

    print()
    print(r.GetValueAt(1969702, 2949238))
    print("{} should match ^^".format(353.61))

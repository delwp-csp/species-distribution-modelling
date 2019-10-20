"""
  lib/raster.py

  FIT3162 - Team 10 - Final Year Computer Science Project
  Copyright Luke Silva, Aichi Tsuchihira, Harsil Patel 2019

  Script containing the class to process raster files to get environment data
"""

from osgeo import ogr, osr, gdal
from os.path import basename


class RasterProcessor:
	# fname must be a .ers file
	def __init__(self, fname):
		"""
		Method to initialise the processor for a given raster dataset
		:param fname: filename of the raster dataset for which the proessor is to be initialised
		"""
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
		"""
		Method to get the value for given co-ordinates and bandIndex
		:param x: latitude at which the value is to be retrieved from
		:param y: longitude at which the value is to be retrieved from
		:param bandIndex: index from which the value is to be retrieved from
		:return: the retrived value for the provided co-ordinates and bandIndex
		"""
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

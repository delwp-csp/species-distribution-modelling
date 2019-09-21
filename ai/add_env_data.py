import sys
import raster
import vector
import transform

try:
	import pandas as pd
	import numpy as np
except:
	print("Failed to load packages, make sure your conda environment is setup correctly")
	sys.exit(1)


def add_raster_data(data, fname, column_name):
	rp = raster.RasterProcessor(fname)
	data[column_name] = data.apply(lambda row: rp.GetValueAt(row['vic_x'], row['vic_y']), axis=1)
	return data


def add_columns(data):
	for raster_file, column in [('../raw_dataset/sept2014JanMaxTemp/sept2014JanMaxTemp.ers', 'jan_max_temp'),
	                            ('../raw_dataset/sept2014JanRainfall/sept2014JanRainfall.ers', 'jan_rainfall'),
	                             ('../raw_dataset/sept2014JulMinTemp/sept2014JulMinTemp.ers', 'jul_min_temp'),
	                              ('../raw_dataset/sept2014JulRainfall/sept2014JulRainfall.ers', 'jul_rainfall')]:
		data = add_raster_data(data, raster_file, column)

	return data


if __name__ == '__main__':
	data = pd.read_csv('../dataset/Agile_Antechinus.csv')

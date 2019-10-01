import sys
import raster
import vector
import transform
from pathlib import Path

try:
	import pandas as pd
	import numpy as np
except:
	print("Failed to load packages, make sure your conda environment is setup correctly")
	sys.exit(1)


def add_raster_data(data, fname):
	column = Path(fname).stem
	rp = raster.RasterProcessor(fname)
	bands_count = rp.data_source.RasterCount
	for band_index in range(bands_count):
		data['{}_{}'.format(column, band_index)] = data.apply(
			lambda row: rp.GetValueAt(row['vic_x'], row['vic_y'], band_index), axis=1)
	return data


def add_columns(data):
	for raster_file in ['../raw_dataset/sept2014JanMaxTemp/sept2014JanMaxTemp.ers',
	                    '../raw_dataset/sept2014JanRainfall/sept2014JanRainfall.ers',
	                    '../raw_dataset/sept2014JulMinTemp/sept2014JulMinTemp.ers',
	                    '../raw_dataset/sept2014JulRainfall/sept2014JulRainfall.ers',
	                    '../raw_dataset/SummerLandsat75_300_900m/SummerLandsat75_300_900m']:
		data = add_raster_data(data, raster_file)

	return data


if __name__ == '__main__':
	data = pd.read_csv('../dataset/Agile_Antechinus.csv')

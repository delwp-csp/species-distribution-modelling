import csv
import sys
import transform
import vector
import raster

columns_to_keep = ['SAMPLING_METHOD_DESC',
                   'SURVEY_START_DATE', 'LATITUDEDD_NUM',
                   'LONGITUDEDD_NUM', 'LAT_LONG_ACCURACYDD_INT', 'TOTAL_COUNT_INT']


def is_reliable(RELIABILITY, RATING_INT):
	return not (RELIABILITY in ('', 'Unconfirmed') and RATING_INT in ('2', '4'))


# Latitude, Longit
def main():
	filename = '../dataset/Agile_Antechinus.csv'

	new_file = filename[:-4] + '_filtered.csv'

	rows = []
	vic_coordinates = []
	with open(filename, 'r') as source:
		rdr = csv.DictReader(source)
		for r in rdr:
			reliability = is_reliable(r['RELIABILITY'], r['RATING_INT'])
			lat, lng = float(r['LATITUDEDD_NUM']), float(r['LONGITUDEDD_NUM'])
			vic_x, vic_y = transform.latlong2vicmap((lat, lng))
			vic_coordinates.append((vic_x, vic_y))
			new_row = [reliability, r['SURVEY_START_DATE'], r['LATITUDEDD_NUM'], r['LONGITUDEDD_NUM'],
			           r['LAT_LONG_ACCURACYDD_INT'], r['TOTAL_COUNT_INT'], vic_x, vic_y]
			rows.append(new_row)

	for f in ['../raw_dataset/VMLITE/VMLITE_BUILT_UP_AREA.shp', '../raw_dataset/VMLITE/VMLITE_FOREST_SU2.shp',
	          '../raw_dataset/VMLITE/VMLITE_HY_WATER_AREA.shp', '../raw_dataset/VMLITE/VMLITE_PUBLIC_LAND_SU3.shp']:
		print('shppp {}'.format(f))
		results = vector.ProcessPoints(vic_coordinates, f)
		for i, v in enumerate(results):
			rows[i].append(v)

	for f in ['../raw_dataset/sept2014JanMaxTemp/sept2014JanMaxTemp.ers', '../raw_dataset/sept2014JanRainfall/sept2014JanRainfall.ers',
	          '../raw_dataset/sept2014JulMinTemp/sept2014JulMinTemp.ers', '../raw_dataset/sept2014JulRainfall/sept2014JulRainfall.ers']:
		print('rasterrr {}'.format(f))
		rp = raster.RasterProcessor(f)
		for i, v in enumerate(vic_coordinates):
			rows[i].append(rp.GetValueAt(*v))

	with open(new_file, 'w') as result:
		wtr = csv.writer(result)
		header = ['is_reliable', 'survey_date', 'latitude', 'longitude', 'lat_lng_accuracy', 'total_count', 'vic_x', 'vic_y', 'within_built_up_area', 'within_forest_u2', 'within_water_area', 'within_public_land_su3', 'jan_max_temp', 'jan_rainfaull', 'july_max_temp', 'july_rainfall']
		wtr.writerows(header + rows)


# f = pd.read_csv(filename)
# new_f = f[columns_to_keep]
#
# for index, row in new_f.iterrows():
# 	print(index)
# 	print(row)
# new_f.to_csv(, index=False)


if __name__ == '__main__':
	main()

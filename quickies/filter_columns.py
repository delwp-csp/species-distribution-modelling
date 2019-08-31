import csv
import sys
import pandas as pd

from collections import defaultdict

columns_to_keep = ['SAMPLING_METHOD_DESC',
                   'SURVEY_START_DATE', 'LATITUDEDD_NUM',
                   'LONGITUDEDD_NUM', 'LAT_LONG_ACCURACYDD_INT', 'TOTAL_COUNT_INT']

def is_reliable(RELIABILITY, RATING_INT):
	return not(RELIABILITY in ('', 'Unconfirmed') and RATING_INT in ('2', '4'))

# Latitude, Longit
def main():
	filename = sys.argv[1]

	new_file = filename[:-4] + '_filtered.csv'

	with open(filename, 'r') as source:
		rdr = csv.DictReader(source)
		with open(new_file, 'w') as result:
			wtr = csv.writer(result)
			for r in rdr:
				reliability = is_reliable(r['RELIABILITY'], r['RATING_INT'])
				wtr.writerow((reliability, r['SURVEY_START_DATE'], r['LATITUDEDD_NUM'], r['LONGITUDEDD_NUM'], r['LAT_LONG_ACCURACYDD_INT'], r['TOTAL_COUNT_INT']))

	with open(new_file, 'r') as original: data = original.read()
	with open(new_file, 'w') as modified: modified.write('is_reliable,survey_date,latitude,longitude,lat_lng_accuracy,total_count\n' + data)


# f = pd.read_csv(filename)
	# new_f = f[columns_to_keep]
	#
	# for index, row in new_f.iterrows():
	# 	print(index)
	# 	print(row)
	# new_f.to_csv(, index=False)


if __name__ == '__main__':
	main()

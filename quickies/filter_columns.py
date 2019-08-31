import sys
import pandas as pd

from collections import defaultdict

columns_to_keep = ['SAMPLING_METHOD_DESC',
                   'SURVEY_START_DATE', 'LATITUDEDD_NUM',
                   'LONGITUDEDD_NUM', 'LAT_LONG_ACCURACYDD_INT', 'TOTAL_COUNT_INT']

def is_reliable(RELIABILITY, RATING_INT):
	# print(RELIABILITY, RATING_INT)
	return not(RELIABILITY in ('', 'Unconfirmed') and RATING_INT in ('2', '4'))


def main():
	filename = sys.argv[1]

	f = pd.read_csv(filename)
	new_f = f[columns_to_keep]

	for index, row in new_f.iterrows():
		print(index)
		print(row)
	new_f.to_csv(filename[:-4] + '_filtered.csv', index=False)


if __name__ == '__main__':
	main()

import csv
from collections import defaultdict
HEADER = ['UFI', 'TAXON_ID', 'SCIENTIFIC_DISPLAY_NME', 'COMMON_NME', 'TAXON_TYPE', 'RELIABILITY', 'RATING_INT', 'RELIABILITY_TXT', 'REVIEW_COMMENT_TXT', 'SAMPLING_METHOD_DESC', 'SURVEY_START_DATE', 'LATITUDEDD_NUM', 'LONGITUDEDD_NUM', 'LAT_LONG_ACCURACYDD_INT', 'TOTAL_COUNT_INT', 'BEHAVIOUR', 'EXTRA_INFORMATION', 'RECORD_TYPE', 'PRIMARY_CDE', 'SV_RECORD_COUNT', 'STATE_CDE', 'LGA_UFI', 'CMA_NO', 'PARK_ID', 'SURVEY_ID', 'SITE_ORIGIN_STATUS_CDE', 'CREATION_TSP']
def main():
	species = defaultdict(list)
	with open('VBA.csv', newline='') as csvfile:
		reader = csv.DictReader(csvfile)
		for row in reader:
			common_name = row['COMMON_NME']
			species[common_name].append(row)

	for common_name in species.keys():
		with open(common_name.replace(' ', '_') + '.csv', 'w') as outfile:
			writer = csv.DictWriter(outfile, fieldnames=HEADER)
			writer.writeheader()
			writer.writerows(species[common_name])


if __name__ == '__main__':
    main()

import csv
import sys
from collections import defaultdict
from matplotlib import pyplot as plt


KEY_RELIABILITY = 'RELIABILITY'
KEY_RELIABILITY_RATING = 'RATING_INT'
KEY_RELIABILITY_COMMENT = 'REVIEW_COMMENT_TXT'


def main():

	filename = sys.argv[1]
	reliablity_groups = defaultdict(list)

	reliable = []
	unreliable = []

	with open(filename, newline='') as csvfile:
		reader = csv.DictReader(csvfile)
		for row in reader:
			is_reliable = not(row[KEY_RELIABILITY] in ('', 'Unconfirmed') and row[KEY_RELIABILITY_RATING] in ('2', '4'))
			coordinates = (float(row['LATITUDEDD_NUM']), float(row['LONGITUDEDD_NUM']))
			if is_reliable:
				reliable.append(coordinates)
			else:
				unreliable.append(coordinates)

	# print()

	unreliable_points = list(zip(*unreliable[:10]))
	plt.scatter(*unreliable_points, c='red')

	reliable_points = list(zip(*reliable[:10]))
	plt.scatter(*reliable_points, c='green')

	print('reliable {}'.format(len(reliable)))
	print('unreliable {}'.format(len(unreliable)))
	print('total non-unique {}'.format(len(reliable+unreliable)))
	print('unique {}'.format(len(set(reliable+unreliable))))
	print('unique unreliabe {}'.format(len(set(unreliable))))

	plt.show()


if __name__ == '__main__':
	main()

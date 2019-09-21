import sys
#try: 
import pandas as pd
import numpy as np
from imblearn.over_sampling import RandomOverSampler, SMOTE, ADASYN

from collections import Counter

from filter_columns import filter_columns
from balance import balance


def main(fname):
    dataset = pd.read_csv(fname)#.sort_values(by='is_reliable')

    data = filter_columns(dataset)
    balanced_data = balance(data)
    print("random", Counter(balanced_data['random'][1]))
    print("smote", Counter(balanced_data['smote'][1]))
    print("adasyn", Counter(balanced_data['adasyn'][1]))




if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: {} [filename]\n\nFilename: path to filtered and preprocessed csv file".format(sys.argv[0]))
        sys.exit(1)
    else: main(sys.argv[1])
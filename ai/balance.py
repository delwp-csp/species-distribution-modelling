import sys
try: 
    import pandas as pd
    import numpy as np
    from imblearn.over_sampling import RandomOverSampler, SMOTE, ADASYN
    
    from collections import Counter

    import filter_columns_pd as f

except:
    print("Failed to load packages, make sure your conda environment is setup correctly")
    sys.exit(1)


def balance(data):

    reliable = data.is_reliable
    print("raw",Counter(reliable))
    data = data.loc[:,['latitude', 'longitude']]

    r_data, r_reliable = RandomOverSampler().fit_resample(data, reliable)
    s_data, s_reliable = SMOTE().fit_resample(data, reliable)
    a_data, a_reliable = ADASYN().fit_resample(data,reliable)
    return {
        'random': [r_data, r_reliable],
        'smote': [s_data, s_reliable],
        'adasyn': [a_data, a_reliable]
    }

def main(fname):
    dataset = pd.read_csv(fname)#.sort_values(by='is_reliable')

    data = f.filter_columns(dataset)
    balanced_data = balance(data)
    print("random", Counter(balanced_data['random'][1]))
    print("smote", Counter(balanced_data['smote'][1]))
    print("adasyn", Counter(balanced_data['adasyn'][1]))




if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: {} [filename]\n\nFilename: path to filtered and preprocessed csv file".format(sys.argv[0]))
        sys.exit(1)
    else: main(sys.argv[1])
import sys
try: 
    import pandas as pd
except:
    print("Failed to load packages, make sure your conda environment is setup correctly")
    sys.exit(1)

def is_reliable(row):
    RELIABILITY = row['RELIABILITY']
    RATING_INT = row['RATING_INT']
    return not (RELIABILITY in ('', 'Unconfirmed') and RATING_INT in ('2', '4'))

def filter_columns(data):
    data['is_reliable'] = data.apply(is_reliable, axis=1)
    return data.rename(columns = {
        'LATITUDEDD_NUM': 'latitude',
        'LONGITUDEDD_NUM': 'longitude'
    })



if __name__ == '__main__':
    data = pd.read_csv('../dataset/Agile_Antechinus.csv')
    print(data.columns)

    ndata = filter_columns(data)
    print(ndata.columns)

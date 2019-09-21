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


def get_vic_coordinates(row):
    return pd.Series(transform.latlong2vicmap((row['latitude'], row['longitude'])))

def get_env_data(data):
    data[['vic_x', 'vic_y']] = data.apply(get_vic_coordinates)


if __name__ == '__main__':
    data = pd.read_csv('../dataset/Agile_Antechinus.csv')


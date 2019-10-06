import sys
import os.path
from lib import raster, vector, transform
from pathlib import Path
from multiprocessing import Pool

try:
    import pandas as pd
    import numpy as np
except:
    print("Failed to load packages, make sure your conda environment is setup correctly")
    sys.exit(1)


def get_raster_data(data, fname):
    column = Path(fname).stem
    rp = raster.RasterProcessor(fname)
    bands_count = rp.data_source.RasterCount
    retdf = pd.DataFrame()
    for band_index in range(bands_count):
        retdf['{}_{}'.format(column, band_index)] = data.apply(
            lambda row: rp.GetValueAt(row['vic_x'], row['vic_y'], band_index), axis=1)
    return retdf


def process_file(data, ftype, fname):

    if os.path.exists(fname):
        print("Processing: {}".format(fname), flush=True)
        if ftype == "raster":
            return get_raster_data(data, fname)
        elif ftype == "vector":
            return vector.ProcessPoints(data, fname)
    else:
        print("Warning: skipping file {} since it doesn't exist".format(fname))

raster_files = [
    "../raw_dataset/75m_dem_streams_burned_sept2012/75m_dem_streams_burned_sept2012.ers",
    "../raw_dataset/ProtectionIndex/ProtectionIndex",
    "../raw_dataset/Radiometrics_2014_th/Radiometrics_2014_th",
    "../raw_dataset/SummerLandsat75_300_900m-005/SummerLandsat75_300_900m",
    "../raw_dataset/SummerPre1750Landsat75_300_900m-003/SummerPre1750Landsat75_300_900m.ers",
    "../raw_dataset/ecoregion1750/ecoregion1750.ers",
    "../raw_dataset/ecoregion2014/ecoregion2014.ers",
    "../raw_dataset/hydro500xwi-004/hydro500xwi.ers",
    "../raw_dataset/ibra_hex/ibra_hex.ers",
    "../raw_dataset/land_cov_use3/land_cov_use3.ers",
    "../raw_dataset/sept2014JanMaxTemp/sept2014JanMaxTemp.ers",
    "../raw_dataset/sept2014JanRainfall/sept2014JanRainfall.ers",
    "../raw_dataset/sept2014JulRainfall/sept2014JulRainfall.ers",
    "../raw_dataset/vegtype3_4/vegtype3_4.ers",
    "../raw_dataset/wetness_index_saga_sept2012/wetness_index_saga_sept2012.ers"
]

vector_files = [
    '../raw_dataset/VMLITE/VMLITE_BUILT_UP_AREA.shp',
    '../raw_dataset/VMLITE/VMLITE_FOREST_SU2.shp',
    #'../raw_dataset/VMLITE/VMLITE_FOREST_SU3.shp',
    #'../raw_dataset/VMLITE/VMLITE_FOREST_SU5.shp',
    #'../raw_dataset/VMLITE/VMLITE_HY_WATER_AREA.shp',
    #'../raw_dataset/VMLITE/VMLITE_HY_WATERCOURSE.shp',
    '../raw_dataset/VMLITE/VMLITE_PUBLIC_LAND_SU3.shp',
    #'../raw_dataset/VMLITE/VMLITE_PUBLIC_LAND_SU5.shp'
]

data_files = [("raster", i) for i in raster_files] + [("vector", i) for i in vector_files]

def add_columns(data):

    pool = Pool()
    sections = pool.starmap(process_file, [(data, x[0], x[1]) for x in data_files])
    result = pd.concat([i for i in sections if not i is None], axis=1)
    pool.close()
    pool.join()

    return pd.concat([data, result], axis=1)


if __name__ == '__main__':
    data = pd.read_csv('../dataset/Agile_Antechinus.csv')

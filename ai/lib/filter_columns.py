"""
  lib/filter_columns.py

  FIT3162 - Team 10 - Final Year Computer Science Project
  Copyright Luke Silva, Aichi Tsuchihira, Harsil Patel 2019

"""

import sys

try:
    import pandas as pd
    import numpy as np
except:
    print(
        "Failed to load packages, make sure your conda environment is setup correctly"
    )
    sys.exit(1)


def is_reliable(row):
    # print(row['RELIABILITY'])
    # print(row['RATING_INT'])
    # print(row)
    isReliable = not (
        row["RELIABILITY"] in (np.nan, "Unconfirmed") and row["RATING_INT"] in (2, 4)
    )
    # if not isReliable:
    #    print("BINGO")
    return int(isReliable)


def filter_columns(data):
    COLUMNS_TO_KEEP = ["is_reliable", "latitude", "longitude"]
    data["is_reliable"] = data.apply(is_reliable, axis=1)
    return data.rename(
        columns={"LATITUDEDD_NUM": "latitude", "LONGITUDEDD_NUM": "longitude"}
    ).loc[:, COLUMNS_TO_KEEP]


# sv record count, record type

if __name__ == "__main__":
    data = pd.read_csv("../dataset/Agile_Antechinus.csv")
    print(data.columns)

    ndata = filter_columns(data)
    print(ndata.columns)
    print(ndata[:5])

"""
  lib/filter_columns.py

  FIT3162 - Team 10 - Final Year Computer Science Project
  Copyright Luke Silva, Aichi Tsuchihira, Harsil Patel 2019

  Script to filter columns to drop the unwanted column, rename the existing columns
  for legibility and merge the multiple reliability columns into a single one.
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
    """
    Method that operates on row combine multiple reliability columns into one
    :param row: A row of the dataset
    :return: An integer value stating the reliability of the row
    """
    isReliable = not (
        row["RELIABILITY"] in (np.nan, "Unconfirmed") and row["RATING_INT"] in (2, 4)
    )

    return int(isReliable)


def filter_columns(data):
    """
    Method to filter dataset's columns by dropping, renaming and merging them
    :param data: dataset whose columns are to be filtered
    :return: dataset with filtered columns
    """
    COLUMNS_TO_KEEP = ["is_reliable", "latitude", "longitude"]
    data["is_reliable"] = data.apply(is_reliable, axis=1)
    return data.rename(
        columns={"LATITUDEDD_NUM": "latitude", "LONGITUDEDD_NUM": "longitude"}
    ).loc[:, COLUMNS_TO_KEEP]


# sv record count, record type

if __name__ == "__main__":
    data = pd.read_csv("../../dataset/Agile_Antechinus.csv")
    print(data.columns)

    ndata = filter_columns(data)
    print(ndata.columns)
    print(ndata[:5])

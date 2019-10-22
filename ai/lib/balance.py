"""
  lib/balance.py

  FIT3162 - Team 10 - Final Year Computer Science Project
  Copyright Luke Silva, Aichi Tsuchihira, Harsil Patel 2019

  Script to balance the datasets by applying the following algorithms,
      - Synthetic Minority Over-sampling Technique (SMOTE)
      - Adaptive Synthetic (ADASYN)
      - Random over-sampling
      - Local Outlier Factor
      - Isolation Forest
"""

import sys

import pandas as pd
import numpy as np
from imblearn.over_sampling import RandomOverSampler, SMOTE, ADASYN

from sklearn.neighbors import LocalOutlierFactor
from sklearn.ensemble import IsolationForest
from numpy.random import randint

from lib.add_env_data import add_columns


def prep_data(data):
    """
    Method to drop the following columns,
        - is_reliable, since that's the y-values we aim to predict
        - lat, lng and vic coordinates since we're already getting the env data from those
    :param data: dataset to be prepped for balancing
    :return: dataset and the reliability values
    """
    return (
        data.drop(columns=["is_reliable", "longitude", "latitude", "vic_x", "vic_y"]),
        data.is_reliable,
    )


methods = {"random": RandomOverSampler, "smote": SMOTE, "adasyn": ADASYN}


def traditional_balance(dataset, method):
    """
    Method that balances the dataset using the given algorithm -- random, smote, adasyn
    :param dataset: dataset to be balanced
    :param method: method to be used to balance the dataset
    :return: balanced dataset
    """
    data, reliable = prep_data(dataset)

    if method in methods:
        new_data, new_reliable = methods[method]().fit_resample(data, reliable)
        return (pd.DataFrame(new_data, columns=data.columns), new_reliable)
    else:
        raise Exception("Unknown balancing method '{}'".format(method))


def novelty_balance(dataset, method):
    """
    Method that balances the dataset using the given novelty-based algorithm -- lof, isolation forest
    :param dataset: dataset to be balanced
    :param method: method to be used to balance the dataset
    :return: balanced dataset
    """
    bal = None
    if method == "lof":
        bal = LocalOutlierFactor(n_neighbors=20, novelty=True, contamination="auto")
    elif method == "isolation_forest":
        bal = IsolationForest(behaviour="new", contamination="auto")
    else:
        raise Exception("Unknown balancing method '{}'".format(method))

    reliable_data = dataset[dataset.is_reliable == 1].drop(
        columns=["latitude", "longitude"]
    )
    unreliable_data = dataset[dataset.is_reliable == 0].drop(
        columns=["latitude", "longitude"]
    )

    bal.fit(reliable_data.drop(columns=["is_reliable", "vic_x", "vic_y"]))

    print("Novelty Balancer - {}".format(method))

    fraction = 1
    while (
        len(unreliable_data) < len(reliable_data) * 0.99
    ):  # Be lenient if we miss out on one or two entries
        num_to_generate = int(
            max(
                (len(reliable_data) - len(unreliable_data)) * (fraction + 0.1),
                100,  # Always generate at least 100 points
            )
        )
        print("Generating {} random points".format(num_to_generate))
        print(
            "Currently have {} reliable and {} unreliable".format(
                len(reliable_data), len(unreliable_data)
            )
        )

        x_coords = randint(2128000, 2960000, num_to_generate)
        y_coords = randint(2258000, 2824000, num_to_generate)

        dt = pd.DataFrame(
            {"is_reliable": [0] * num_to_generate, "vic_x": x_coords, "vic_y": y_coords}
        )
        dt = add_columns(dt)

        pred = bal.predict(dt.drop(columns=["vic_x", "vic_y", "is_reliable"]))
        ut = dt[pred == -1]

        fraction = num_to_generate / len(ut)
        unreliable_data = unreliable_data.append(
            ut.sample(min(len(ut), len(reliable_data) - len(unreliable_data))),
            ignore_index=True,
        )

    return reliable_data.append(unreliable_data, ignore_index=True).drop(
        columns=["vic_x", "vic_y"]
    )

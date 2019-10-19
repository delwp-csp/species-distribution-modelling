"""
  cmds/cmd_preprocess.py

  FIT3162 - Team 10 - Final Year Computer Science Project
  Copyright Luke Silva, Aichi Tsuchihira, Harsil Patel 2019

"""

import sys
import pandas as pd

from lib.transform import add_vic_coordinates
from lib.filter_columns import filter_columns
from lib.vector import ProcessPoints
from lib.add_env_data import add_columns


def preprocess(args):
    if not args.outfile:
        print("Warning: Preprocessing data without an outfile is useless...")

    print("Reading csv...", flush=True)
    dataset = pd.read_csv(args.infile)
    print("Filtering columns...", flush=True)

    data = filter_columns(dataset)
    print("Adding vicmap coordinates", flush=True)
    data = add_vic_coordinates(data)

    print("Adding environmental data", flush=True)
    data = add_columns(data)

    if args.outfile:
        print("Writing to file...", flush=True)
        data.to_csv(args.outfile)

    print("Done", flush=True)
    return data

import sys
import pandas as pd

from lib.transform import add_vic_coordinates
from lib.filter_columns import filter_columns
from lib.vector import ProcessPoints
from lib.add_env_data import add_columns

def preprocess(args):
    if not args.outfile:
        print("Warning: Preprocessing data without an outfile is useless...")
    
    dataset = pd.read_csv(args.infile)

    data = filter_columns(dataset)
    data = add_vic_coordinates(data)

    data = add_columns(data)

    data.to_csv(args.outfile)
    return data

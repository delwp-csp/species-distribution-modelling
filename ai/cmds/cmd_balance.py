"""
  cmds/cmd_balance.py

  FIT3162 - Team 10 - Final Year Computer Science Project
  Copyright Luke Silva, Aichi Tsuchihira, Harsil Patel 2019
  
  Script to delegate the balancing of the datasets by applying the following algorithms,
      - Synthetic Minority Over-sampling Technique (SMOTE)
      - Adaptive Synthetic (ADASYN)
      - Random over-sampling
      - Local Outlier Factor
      - Isolation Forest
"""

import pandas as pd
from lib.balance import traditional_balance, novelty_balance


def balance(args):
    """
    :param args: the arguments parsed from the command line interface
    :return: the balanced dataset
    """
    if not args.outfile:
        print("Warning: Balancing data without an outfile is useless...")

    dataset = pd.read_csv(args.infile, index_col=0)

    if args.balancer_type in ["smote", "adasyn", "random"]:
        dataset, r = traditional_balance(dataset, args.balancer_type)
        dataset["is_reliable"] = r
    else:
        dataset = novelty_balance(dataset, args.balancer_type)
    if args.outfile:
        dataset.to_csv(args.outfile)
    return dataset

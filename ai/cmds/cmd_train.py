"""
  cmds/cmd_train.py

  FIT3162 - Team 10 - Final Year Computer Science Project
  Copyright Luke Silva, Aichi Tsuchihira, Harsil Patel 2019

  Script that delegates to lib/train.py to train the dataset and create a model
"""

import pandas as pd
from joblib import dump
from lib.train import train_model


def train(args):
    """
    :param args: the arguments parsed from the command line interface
    :return: the trained model
    """
    if not args.outfile:
        print("Warning: Training data without saving the model is useless...")

    dataset = pd.read_csv(args.infile, index_col=0)
    model = train_model(dataset, dataset.is_reliable, args.training_type)

    if args.modelfile:
        dump(model, args.modelfile)

    return model

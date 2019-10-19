#!/usr/bin/env python3
import argparse
import sys
from cmds import *


def setup_files(subparser, setup_outfile=True, setup_modelfile=True):
    subparser.add_argument(
        "-i", "--infile", required=True, help="input file to read the data from"
    )
    if setup_outfile:
        subparser.add_argument("-o", "--outfile")
    if setup_modelfile:
        subparser.add_argument("-m", "--modelfile")


def init_parser():
    parser = argparse.ArgumentParser(
        description="Process arguments to model species data"
    )

    subparsers = parser.add_subparsers(metavar="cmd", required=True)
    p_preprocess = subparsers.add_parser(
        "preprocess", help="Adds the environmental data to a csv of observations"
    )
    setup_files(p_preprocess, setup_modelfile=False)
    p_preprocess.set_defaults(func=preprocess)

    p_balance = subparsers.add_parser(
        "balance",
        help="Balances the data to have roughly the same number of reliable and un-reliable data points",
    )
    p_balance.add_argument(
        "balancer_type",
        choices=["smote", "adasyn", "random", "lof", "isolation_forest"],
        metavar="balancer-type",
        help="""
	The balancer to use to balance the data set.
	Valid options are: smote, adasyn, random
	""",
    )
    setup_files(p_balance, setup_modelfile=False)
    p_balance.set_defaults(func=balance)

    p_test_train = subparsers.add_parser(
        "test_train",
        help="Trains the models and outputs the stats of the trained model",
    )
    p_test_train.add_argument("training_type")
    setup_files(p_test_train, setup_outfile=False)
    p_test_train.set_defaults(func=test_train)

    p_train = subparsers.add_parser(
        "train", help="Trains the models for the provided training type"
    )
    p_train.add_argument("training_type")
    setup_files(p_train, setup_outfile=False)
    p_train.set_defaults(func=train)

    p_predict = subparsers.add_parser(
        "predict", help="Predict the reliability of the recorded data"
    )
    setup_files(p_predict)
    p_predict.set_defaults(func=predict)

    p_plot = subparsers.add_parser("plot", help="Plot the model on a graph")
    setup_files(p_plot)
    p_plot.set_defaults(func=plot)

    p_init = subparsers.add_parser(
        "init", help="Ensure that the system is initialised for the plots"
    )
    p_init.set_defaults(func=generate_grid)

    return parser


def main():
    # args = paresr_args['addemnv']
    parser = init_parser()
    args = parser.parse_args()

    args.func(args)


if __name__ == "__main__":
    main()

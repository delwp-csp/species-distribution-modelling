#!/usr/bin/env python3
import argparse
import sys
from cmd_addenv import addenv

def dummy(args):
	print("501 Not Implemented")
	print(args)
	sys.exit(1)


def setup_files(subparser, setup_outfile = True, setup_modelfile = True):
	subparser.add_argument('-i', '--infile', required=True, help='input file to read the data from')
	if (setup_outfile):
		subparser.add_argument('-o', '--outfile')
	if (setup_modelfile):
		subparser.add_argument('-m', '--modelfile')

	
def init_parser():
	parser = argparse.ArgumentParser(description='Process arguments to model species data')

	subparsers = parser.add_subparsers(metavar="cmd")
	p_addenv = subparsers.add_parser('addenv', help='Adds the environmental data to a csv of observations')
	setup_files(p_addenv, setup_modelfile=False)
	p_addenv.set_defaults(func=addenv)

	p_balance = subparsers.add_parser('balance', help='Balances the data to have roughly the same number of reliable and un-reliable data points')
	p_balance.add_argument('balancer_type', choices=['smote', 'adasyn', 'random'], metavar='balancer-type', help="""
	The balancer to use to balance the data set.
	Valid options are: smote, adasyn, random
	""")
	setup_files(p_balance, setup_modelfile=False)
	p_balance.set_defaults(func=dummy)

	p_test_train = subparsers.add_parser('test-train', help='Trains the models and outputs the stats of the trained model')
	p_test_train.add_argument('training_type')
	setup_files(p_test_train, setup_outfile=False)
	p_test_train.set_defaults(func=dummy)

	p_train = subparsers.add_parser('train', help='Trains the models for the provided training type')
	p_train.add_argument('training-type')
	setup_files(p_train, setup_outfile=False)
	p_train.set_defaults(func=dummy)

	p_predict = subparsers.add_parser('predict', help='Predict the reliability of the recorded data')
	setup_files(p_predict)
	p_predict.set_defaults(func=dummy)    


	return parser




def main():
	#args = paresr_args['addemnv']
	parser = init_parser()
	args = parser.parse_args()

	args.func(args)
	



if __name__ == '__main__':
	main()
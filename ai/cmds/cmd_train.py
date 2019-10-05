import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn import svm
from joblib import dump
from lib.train import train_model




def train(args):
	if not args.outfile:
		print("Warning: Training data without saving the model is useless...")

	dataset = pd.read_csv(args.infile)
	model = train_model(dataset, args.training_type)

	if args.modelfile:
		dump(model, args.modelfile)

	return model

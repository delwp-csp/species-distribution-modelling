import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn import svm
from joblib import dump



def train(args):
	if not args.outfile:
		print("Warning: Training data without saving the model is useless...")

	dataset = pd.read_csv(args.infile)
	x, y = dataset[args.training_type]

	model = svm.SVC(gamma='scale')
	model.fit(x, y)

	if args.modelfile:
		dump(model, args.modelfile)

	return model

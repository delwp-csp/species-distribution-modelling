import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.metrics import accuracy_score
from joblib import dump


def test_train(args):
	if not args.outfile:
		print("Warning: Training data without saving the model is useless...")

	dataset = pd.read_csv(args.infile)
	x, y = dataset[args.training_type]

	x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.1)

	model = svm.SVC(gamma='scale')
	model.fit(x_train, y_train)

	if args.modelfile:
		dump(model, args.modelfile)

	return model

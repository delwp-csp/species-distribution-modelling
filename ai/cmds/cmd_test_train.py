from sklearn.metrics import accuracy_score
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn import svm
from joblib import dump
from lib.train import train_model, predict_model


def test_train(args):
	# todo: integrate predict command and drop commands

	dataset = pd.read_csv(args.infile)
	y = dataset.is_reliable
	dataset = dataset.drop(columns=['is_reliable'])
	x = dataset

	x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.1)

	model = train_model(x_train, y_train, args.training_type)

	if args.modelfile:
		dump(model, args.modelfile)

	predictions = predict_model(x_test, model)
	accuracy = accuracy_score(y_test, predictions)
	print('accuracy is {}'.format(accuracy))

	return accuracy

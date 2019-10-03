import sys
import pandas as pd
from sklearn.preprocessing import scale
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.metrics import accuracy_score


def test_train(args):
	dataset = pd.read_csv(args.infile)
	x, y = dataset[args.training_type]

	x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.1)

	md = svm.SVC(gamma='scale')
	md.fit(x_train, y_train)

	predictions = md.predict(x_test)

	accuracy = accuracy_score(y_test, predictions)
	print(accuracy)

	return accuracy

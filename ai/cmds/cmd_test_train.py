from .cmd_train import train
from sklearn.metrics import accuracy_score


def test_train(args):
	model, x_test, y_test = train(args)

	predictions = model.predict(x_test)
	accuracy = accuracy_score(y_test, predictions)
	print(accuracy)

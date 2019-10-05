import pandas as pd
from joblib import load


def predict(args):
	dataset = pd.read_csv(args.infile)

	x, y = dataset[args.training_type] # todo: fix this

	model = load(args.modelfile)
	predictions = model.predict(x)

	if args.outfile:
		pd.DataFrame(predictions, columns=['predictions']).to_csv(args.outfile)

	return predictions

from sklearn.neural_network import MLPClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.gaussian_process import GaussianProcessClassifier
from sklearn.gaussian_process.kernels import RBF
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.discriminant_analysis import QuadraticDiscriminantAnalysis


methods = {
    "nearest-neighbour": lambda: KNeighborsClassifier(),
    "linear-svm": lambda: SVC(kernel="linear", C=0.025),
    "rbf-svm": lambda: SVC(gamma=2, C=1),
	"svm": lambda: SVC(gamma='scale'),
	"guassian": lambda: GaussianProcessClassifier(1.0 * RBF(1.0)),
	"decision-tree": lambda: DecisionTreeClassifier(max_depth=5),
	"random-forest": lambda: RandomForestClassifier(max_depth=5, n_estimators=10, max_features=1),
	"neural-net": lambda: MLPClassifier(alpha=1, max_iter=100000),
	"ada-boost": lambda: AdaBoostClassifier(),
	"naive-bayes": lambda: GaussianNB(),
	"qda": lambda: QuadraticDiscriminantAnalysis()
}

def train_model(dataset, is_reliable, method):
	for drop_column in ['is_reliable', 'vic_x', 'vix_y', 'latitude', 'longitude']:
		if drop_column in dataset.columns:
			dataset = dataset.drop(columns=[drop_column])

	if not method in methods:
		raise Exception('Unknown training method {}'.format(method))

	model = methods[method]()
	model.fit(dataset, is_reliable)
	return model

def predict_model(dataset, model):
	for drop_column in ['is_reliable', 'vic_x', 'vix_y', 'latitude', 'longitude']:
		if drop_column in dataset.columns:
			dataset = dataset.drop(columns=[drop_column])

	return model.predict(dataset)

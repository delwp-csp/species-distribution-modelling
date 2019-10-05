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
	"guassian": lambda: GaussianProcessClassifier(1.0 * RBF(1.0)),
	"decision-tree": lambda: DecisionTreeClassifier(max_depth=5),
	"random-forest": lambda: RandomForestClassifier(max_depth=5, n_estimators=10, max_features=1),
	"neural-net": lambda: MLPClassifier(alpha=1, max_iter=1000),
	"ada-boost": lambda: AdaBoostClassifier(),
	"naive-bayes": lambda: GaussianNB(),
	"qda": lambda: QuadraticDiscriminantAnalysis()
}

def train_model(dataset, method):
	y = dataset.is_reliable
	dataset = dataset.drop(columns=['is_reliable'])

	for drop_column in ['vic_x', 'vix_y', 'latitude', 'longitude']:
		if drop_column in list(dataset.columns):
			dataset.drop((drop_column))
	x = dataset
	model = methods[method]()
	model.fit(x, y)
	return model


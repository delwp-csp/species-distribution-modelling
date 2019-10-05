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
    "nearest-neighbour": KNeighborsClassifier(),
    "linear-svm": SVC(kernel="linear", C=0.025),
    "rbf-svm": SVC(gamma=2, C=1),
	"guassian": GaussianProcessClassifier(1.0 * RBF(1.0)),
	"decision-tree": DecisionTreeClassifier(max_depth=5),
	"random-forest": RandomForestClassifier(max_depth=5, n_estimators=10, max_features=1),
	"neural-net": MLPClassifier(alpha=1, max_iter=1000),
	"ada-boost": AdaBoostClassifier(),
	"naive-bayes": GaussianNB(),
	"qda": QuadraticDiscriminantAnalysis()
}

def train_model(dataset, method):
	y = dataset.is_reliable
	dataset.drop('is_reliable')
	x, y = dataset,
	model = methods[method]
	model.fit(x, y)
	return model


import pandas as pd
from sklearn.neighbors import LocalOutlierFactor
from sklearn import svm
from sklearn.ensemble import IsolationForest
from numpy.random import randint
from numpy import arange
from lib.add_env_data import add_columns
import matplotlib.pyplot as plt
import sys

# x_coords = randint(2128000, 2960000, 8000)
# y_coords = randint(2258000, 2824000, 8000)
# dt = pd.DataFrame({ "vic_x": x_coords, "vic_y": y_coords})
# dt = add_columns(dt)
# dt.to_csv("random_points.csv")
# sys.exit(1)


dt = pd.read_csv("random_points.csv", index_col=0)

d = pd.read_csv("preprocessed.csv",index_col=0)

d = d[d.is_reliable == 1]

for model in [
    ("Local Outlier Factor", lambda c: LocalOutlierFactor(n_neighbors = 20, novelty = True, contamination=c)),
    #("One class SVM", lambda c: svm.OneClassSVM(nu=c, kernel="rbf", gamma=0.1)),
    ("Isolation Forest", lambda c: IsolationForest(behaviour='new', contamination=c))
]:

    for _c in arange(0.01,0.20,0.01):
        contamination = round(_c,2)
        print(model[0], contamination)

        clf = model[1](contamination)
        clf.fit(d.drop(columns=["is_reliable", "latitude", "longitude", "vic_x", "vic_y"]))

        pred = clf.predict(dt.drop(columns=["vic_x", "vic_y"]))


        rt = dt[pred == 1]
        ut = dt[pred == -1]
        plt.title("{}, c = {}".format(model[0], contamination))
        plt.scatter(x = d.vic_x, y=d.vic_y, c = '#000099', s=2)
        plt.scatter(x = rt.vic_x, y=rt.vic_y, c = '#009900', s=2)
        plt.scatter(x = ut.vic_x, y=ut.vic_y, c = '#ff0000', s=2)
        plt.savefig("{}{}.png".format(model[0], contamination))
        # plt.show()




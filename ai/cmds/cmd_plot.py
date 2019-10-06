import pandas as pd
from numpy import linspace, meshgrid
from lib.add_env_data import add_columns
import matplotlib.pyplot as plt
import sys
import os.path
from joblib import load


grid_filename = os.path.dirname(os.path.realpath(__file__)) + '/grid.csv'

def generate_grid(args):
    # Take args so that it doesn't crash
    if os.path.exists(grid_filename):
        print("Grid already exists, returning")
        return

    print("Grid not found - Generating")
    xspace = linspace(2128000, 2960000, 80)
    yspace = linspace(2258000, 2824000, 80)
    x_coords, y_coords = meshgrid(xspace, yspace)

    dt = pd.DataFrame({ "vic_x": x_coords.flatten(), "vic_y": y_coords.flatten()})
    dt = add_columns(dt)
    dt.to_csv(grid_filename)

def plot(args):

    if not os.path.exists(grid_filename):
        generate_grid(args)

    model = load(args.modelfile)
    d = pd.read_csv(args.infile, index_col=0)
    dt = pd.read_csv(grid_filename, index_col=0)
    pred = model.predict(dt.drop(columns=["vic_x", "vic_y"]))

    rt = dt[pred == 1]
    ut = dt[pred != 1]
    plt.scatter(x = rt.vic_x, y=rt.vic_y, c = '#009900', s=2)
    plt.scatter(x = ut.vic_x, y=ut.vic_y, c = '#ff0000', s=2)
    plt.scatter(x = d.vic_x, y=d.vic_y, c = '#000099', s=2)
    plt.savefig(args.outfile)
# Setup of GDAL

First install miniconda / anaconda
Run the following to install the packages
```
conda create -n gdal -c conda-forge gdal tiledb=1.6.0 scikit-learn imbalanced-learn matplotlib matplotlib-base mpl_sample_data pandas
```

Then whenever you want to run any of the python code, use `conda activate gdal`


# Running unit tests
Run the following command to run the unit tests: `python3 -m unittest discover`
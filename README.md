# delwp-species-modelling

### *What to prepare*

To make predictions on an unverified dataset, the user will need to
**prepare two CSV files.**

-   First CSV file: A file that contains a set of **reliable** species
    observation data. Models will be generated based on this dataset.

<!-- -->

-   Second CSV file: This file contains a set of species observation
    data that you would like to check whether they are reliable or not.

The CSV files must only include species observation data for a
**particular specie and not multiple species.**

### *Adding a new species*

To make predictions for a specie, first the user will need to add the
species to the application.

Steps:

1.  Click on the ‘Add new species’ button on the top right corner of the
    home page.


1.  Enter the specie names as well as the description of the species.

2.  Upload one CSV file which contains **reliable** observation data

1.  The added species will be displayed on the home page.

### 

### *Making predictions:*

After the user has uploaded reliable species observation data, the
application will automatically generate models. Using those models, the
user can upload unverified observation data to check their reliability

Steps:

1.  In the home page, click on the species that you want to make a
    prediction on.

2.  If the model is in the generation process, wait till it is complete.
    (Usually takes around 15 minutes)

3.  After the model generation is complete, click on a model entry in
    the list to use for predictions from the list of models available

![](media/image3.png){width="4.808681102362205in"
height="3.2031255468066493in"}

1.  Click on ‘Run Predictions’

1.  Upload 1 CSV file to run predictions
    on.![](media/image5.png){width="4.8840146544181975in"
    height="2.1093755468066493in"}

2.  Wait till the predictions are complete.

### *Obtaining the results of the predictions made:*

After uploading a CSV file to run predictions on, the application will
predict the reliability of each species observation data in the file.
After that, the user will be able to download a CSV file containing the
results of those predictions.

Steps:

1.  Click on the specie that the predictions were made for

2.  Click on ‘Predictions’ tab on the top navigation bar

![](media/image3.png){width="4.8125in" height="0.46875in"}

1.  Click on ‘Done’ link (in green) and it will automatically download a
    CSV file.

![](media/image6.png){width="5.557292213473316in"
height="0.7108158355205599in"}

\
=

Technical User Guide
--------------------

### Running Docker

If the docker is not installed on the system, please refer to the
[*official documentation.*](https://docs.docker.com/install/)

Once docker is installed. Ensure the *present working directory* has the
Dockerfile, to create the docker from the docker file execute the
following command.

docker build -t species\_modelling .

The above command will create a docker called *species\_modelling* which
can be deployed to use the application.

Ensure that the raster files are downloaded on the host device. All the
datasets should be extracted in a single directory which can then be
mounted in the docker using an environment variable. Consequently to set
the environment variables using,

export RAW\_DATASET=/absolute/path/to/raw\_dataset

Following that, execute the command given below to run the docker
instance,

docker run --rm -v \$RAW\_DATASET:/delwp/raw\_dataset -p 80:80
species\_modelling

The -v flag in the above command will instruct the docker to bind the
volumes for raw dataset and dataset from the host system to the
respective folders in the docker. Furthermore, the -p flag will publish
the contain’s port to host’s port. After executing the above command,
the docker will initialise and begin to cache the data that is required
to generate the plots, therefore the user might have to wait for a few
minutes for it to be able to accept processing jobs.

### Running manually

#### Install NodeJs

The Node.js application serves the graphical interface components. The
latest version of nodejs can be found on the [*official
website*](https://nodejs.org/en/download/).

#### Install Yarn

Yarn is a package manager that is used in the project which can be
downloaded from the [*official
website*](https://yarnpkg.com/lang/en/docs/install/). Thereafter, to
install the dependencies and build the frontend the following commands
need to be executed,

cd delwp/backend && yarn

cd delwp/frontend && yarn && yarn build

#### Install anaconda

Anaconda is a free and open-source distribution of the Python and R
programming languages for scientific computing, that aims to simplify
package management and deployment which can be downloaded from the
official [*website.*](https://www.anaconda.com/distribution/) Thereafter
to install dependencies, execute the following command

conda create -n gdal -c conda-forge gdal tiledb=1.6.0 scikit-learn
imbalanced-learn matplotlib matplotlib-base mpl\_sample\_data pandas

The above command will create an environment called *gdal*, which should
be activated while executing the python scripts (or the server) which
can be done as follows,

conda activate gdal

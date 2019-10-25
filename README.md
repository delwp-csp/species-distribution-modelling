Technical User Guide
--------------------

### Running Docker

If the docker is not installed on the system, please refer to the
[*official documentation.*](https://docs.docker.com/install/)

Once docker is installed. Ensure the *present working directory* has the
Dockerfile, to create the docker from the docker file execute the
following command.

`docker build -t species\_modelling .`

The above command will create a docker called *species\_modelling* which
can be deployed to use the application.

Ensure that the raster files are downloaded on the host device. All the
datasets should be extracted in a single directory which can then be
mounted in the docker using an environment variable. Consequently to set
the environment variables using,

`export RAW\_DATASET=/absolute/path/to/raw\_dataset`

Following that, execute the command given below to run the docker
instance,

`docker run --rm -v \$RAW\_DATASET:/delwp/raw\_dataset -p 80:80
species\_modelling`

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

`cd delwp/backend && yarn`

`cd delwp/frontend && yarn && yarn build`

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

`conda activate gdal`

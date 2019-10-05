# init
FROM node:10
MAINTAINER Harsil Patel <harsilspatel@gmail.com>

# copy the ai scripts
RUN mkdir delwp
COPY ai delwp/ai
COPY backend delwp/backend
COPY frontend delwp/frontend

# install miniconda
RUN wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
RUN bash Miniconda3-latest-Linux-x86_64.sh -b && rm Miniconda3-latest-Linux-x86_64.sh
ENV PATH="/root/miniconda3/bin:${PATH}"

# install dependencies
RUN conda create -n gdal -c conda-forge gdal tiledb=1.6.0 scikit-learn imbalanced-learn matplotlib matplotlib-base mpl_sample_data pandas


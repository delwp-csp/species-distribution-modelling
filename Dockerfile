# init
FROM node:10
LABEL maintainer="harsil.s.patel@gmail.com>"

# copy the ai scripts
RUN mkdir delwp

# install miniconda
RUN wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
RUN bash Miniconda3-latest-Linux-x86_64.sh -b && rm Miniconda3-latest-Linux-x86_64.sh
ENV PATH="/root/miniconda3/bin:${PATH}"

# install dependencies
RUN conda create -n gdal -c conda-forge gdal tiledb=1.6.0 scikit-learn imbalanced-learn matplotlib matplotlib-base mpl_sample_data pandas


COPY ai delwp/ai
COPY backend delwp/backend
COPY frontend delwp/frontend

RUN cd delwp/backend && yarn
RUN cd delwp/frontend && yarn && yarn build
RUN cp -r /delwp/frontend/build /delwp/backend/frontend
RUN rm -r /delwp/frontend

RUN mkdir delwp/dataset
RUN conda init bash

CMD bash -c "source ~/.bashrc && conda activate gdal && cd delwp/backend && python3 ../ai/main.py init && node server.js"

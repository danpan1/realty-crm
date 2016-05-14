FROM node:0.10
RUN curl https://install.meteor.com/ | sh
ADD . /app
WORKDIR /app
CMD meteor

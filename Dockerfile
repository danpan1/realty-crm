FROM phusion/baseimage

RUN apt-get update && apt-get upgrade -y -o Dpkg::Options::="--force-confold"
RUN set -ex \
  && curl -sL https://install.meteor.com | sed s/--progress-bar/-sL/g | /bin/sh \
  && mkdir /build

WORKDIR /app
ADD . /app

RUN meteor build --architecture=os.linux.x86_64 --directory /build

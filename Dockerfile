FROM meteorhacks/meteord:base
WORKDIR /app
ADD . /app
ONBUILD RUN meteor build --architecture=os.linux.x86_64 /tmp/app

FROM jenkinsgetrent/getrent:meteor
ADD . /src
WORKDIR /src
RUN meteor build / --architecture os.linux.x86_64 --directory

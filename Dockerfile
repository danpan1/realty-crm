FROM jenkinsgetrent/getrent:meteor
ADD . /src
WORKDIR /src
CMD meteor
#RUN meteor build / --architecture os.linux.x86_64 --directory

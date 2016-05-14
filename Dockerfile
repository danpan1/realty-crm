FROM jenkinsgetrent/getrent:meteor

ADD . /src
WORKDIR /src
RUN meteor build / --architecture os.linux.x86_64 --directory

WORKDIR /bundle/programs/server
RUN npm install

WORKDIR /bundle
RUN meteor npm install --save angular angular-ui-router angular-material angular-meteor

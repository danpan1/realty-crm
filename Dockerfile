FROM jenkinsgetrent/getrent:meteor
ADD . /src
WORKDIR /src
RUN npm cache clean
RUN npm install --production
#RUN meteor npm install --save angular angular-ui-router angular-material angular-meteor
RUN meteor build / --architecture os.linux.x86_64 --directory

WORKDIR /bundle/programs/server
RUN npm install

WORKDIR /bundle

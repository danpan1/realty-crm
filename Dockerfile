FROM meteor
ADD . /tmp/meteor
WORKDIR /tmp/meteor
RUN npm install --production \
	&& meteor build --architecture os.linux.x86_64 --directory /tmp/build/ \
	&& cp -R /tmp/build/bundle /app
WORKDIR /app/programs/server
RUN npm install

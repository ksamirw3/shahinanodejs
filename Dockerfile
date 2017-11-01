FROM node:6.4
RUN apt-get update
RUN npm install

# RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927 \
#   && echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.2 main" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list \
#   && apt-get update \
#   && apt-get install -y mongodb-org --no-install-recommends \
#   && apt-get clean \
#   && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
# RUN mongod start



WORKDIR /app

EXPOSE 1337

CMD node server.js

# CMD while true; do sleep 1000; done
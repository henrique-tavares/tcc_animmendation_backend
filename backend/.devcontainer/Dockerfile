FROM node:16

COPY .devcontainer/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN apt-get -y update && apt-get -y install sudo

RUN npm i -g pnpm ts-node

USER node

WORKDIR /home/node/app
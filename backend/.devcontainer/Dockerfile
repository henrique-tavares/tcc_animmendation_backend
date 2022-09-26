FROM node:16.17.0-alpine3.15

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN apk add git bash ncurses --no-cache
ENV GIT_DISCOVERY_ACROSS_FILESYSTEM=1

RUN npm i -g pnpm ts-node

USER node

COPY .bashrc /home/node/.bashrc

WORKDIR /home/node/TCC-Animmendation/backend

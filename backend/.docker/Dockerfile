FROM node:16

COPY .docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN npm i -g pnpm

USER node

WORKDIR /home/node/app
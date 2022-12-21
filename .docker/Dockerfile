FROM node:lts-slim

WORKDIR /app

COPY . .

RUN npm i -g pnpm
RUN pnpm i
RUN pnpm run build && pnpm run copy_proto

EXPOSE 4000

CMD ["node", "./dist/src/server.js"]

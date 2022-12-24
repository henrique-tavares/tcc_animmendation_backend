FROM node:lts-slim

WORKDIR /app

COPY . .

RUN npm i -g pnpm ts-node
RUN pnpm i
# RUN pnpm run build && pnpm run copy_proto

EXPOSE 4000

CMD ["ts-node", "./src/server.ts"]

import "reflect-metadata";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { schema } from "./schema";
import { config } from "dotenv";
import GracefulServer from "@gquittet/graceful-server";
import fastifyRoutes from "@fastify/routes";
import fastifyView from "@fastify/view";
import cors from "@fastify/cors";
import ejs from "ejs";
import { redisClient } from "./infrastructure/redis/client";
import { malLogin } from "./login/mal";
import { createYoga } from "graphql-yoga";
import { loginCredentials } from "./login/credentials";

config({ override: true });

const envToLogger: Record<string, any> = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};

const app = fastify({
  logger: envToLogger[process.env.ENV ?? ""] ?? true,
});

const gracefulServer = GracefulServer(app.server);

gracefulServer.on(GracefulServer.READY, () => {
  redisClient.connect();
  app.log.info("Server is ready");
});

gracefulServer.on(GracefulServer.SHUTTING_DOWN, () => {
  redisClient.disconnect();
  app.log.warn("Server is shutting down");
});

gracefulServer.on(GracefulServer.SHUTDOWN, (error) => {
  app.log.error(`Server is down because of ${error.message}`);
});

app.register(cors, {
  origin: true,
  credentials: true,
});

app.register(fastifyView, {
  engine: {
    ejs,
  },
});

const yoga = createYoga<{
  req: FastifyRequest;
  reply: FastifyReply;
}>({
  logging: {
    debug: (...args) => args.forEach((arg) => app.log.debug(arg)),
    info: (...args) => args.forEach((arg) => app.log.info(arg)),
    warn: (...args) => args.forEach((arg) => app.log.warn(arg)),
    error: (...args) => args.forEach((arg) => app.log.error(arg)),
  },
  schema,
});

app.route({
  url: "/graphql",
  method: ["GET", "POST", "OPTIONS"],
  handler: async (req, reply) => {
    const response = await yoga.handleNodeRequest(req, {
      req,
      reply,
    });
    response.headers.forEach((value, key) => {
      reply.header(key, value);
    });

    reply.status(response.status);

    reply.send(response.body);

    return reply;
  },
});

app.register(malLogin, { prefix: "/login" });
app.register(loginCredentials, { prefix: "/login" });

app
  .listen({
    host: "0.0.0.0",
    port: Number(process.env.API_PORT) || 4000,
  })
  .then(() => {
    gracefulServer.setReady();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

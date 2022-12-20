import { FastifyPluginCallback } from "fastify";
import { redisClient } from "../infrastructure/redis/client";

export const loginCredentials: FastifyPluginCallback = (fastify, _, done) => {
  fastify.get("/credentials/:sessionId", async (req, res) => {
    const { sessionId } = req.params as { sessionId: string };
    const credentials = (await redisClient.json.get(
      `login:${sessionId}`
    )) as any as
      | {
          credentials: {
            accessToken: string;
            refreshToken: string;
          } | null;
        }
      | undefined;

    if (!credentials) {
      return res
        .status(403)
        .send({ error: "There are no login credentials with this sessionId" });
    }

    return res.status(200).send(credentials);
  });

  done();
};

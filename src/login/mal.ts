import axios from "axios";
import { FastifyPluginCallback } from "fastify";
import { redisClient } from "../infrastructure/redis/client";

export const malLogin: FastifyPluginCallback = (fastify, _, done) => {
  fastify.get("/mal", async (req, res) => {
    const { sessionId } = req.query as { sessionId: string };

    redisClient.json.set(`login:${sessionId}`, "$", {
      credentials: null,
    });
    redisClient.expire(`login:${sessionId}`, 5 * 60);

    const queryParams = {
      response_type: "code",
      client_id: process.env.MAL_CLIENT_ID,
      scope: "write:users",
      code_challenge: process.env.MAL_CODE_CHALLENGE,
      redirect_uri: process.env.MAL_CALLBACK_URL,
      state: sessionId,
    };
    const url = new URL(
      `https://myanimelist.net/v1/oauth2/authorize?${Object.entries(queryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")}`
    );
    res.redirect(302, url.href);
  });

  fastify.get("/mal/callback", async (req, res) => {
    const { code, state: sessionId } = req.query as {
      code?: string;
      state: string;
    };

    try {
      const formData = new URLSearchParams({
        client_id: process.env.MAL_CLIENT_ID ?? "",
        client_secret: process.env.MAL_CLIENT_SECRET ?? "",
        grant_type: "authorization_code",
        code: code ?? "",
        code_verifier: process.env.MAL_CODE_CHALLENGE ?? "",
        redirect_uri: process.env.MAL_CALLBACK_URL ?? "",
      });
      const tokenRes = await axios.post<{
        access_token: string;
        refresh_token: string;
      }>("https://myanimelist.net/v1/oauth2/token", formData.toString());

      await redisClient.json.set(`login:${sessionId}`, "$", {
        credentials: {
          accessToken: tokenRes.data.access_token,
          refreshToken: tokenRes.data.refresh_token,
        },
      });
      return res.view("/src/views/loginCallback.ejs");
    } catch (error) {
      await redisClient.json.del(`login:${sessionId}`);
      return res.view("/src/views/loginCallback.ejs");
    }
  });

  done();
};

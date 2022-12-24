import { FastifyPluginCallback } from "fastify";
import axios from "axios";

export const translator: FastifyPluginCallback = (fastify, _, done) => {
  fastify.get("/translate", async (req, res) => {
    const translateBody = req.body as {
      q: string;
      source: string;
      target: string;
    };

    const { data } = await axios.post<{ translated_text: string }>(
      `${process.env.TRANSLATOR_URL}/translate`,
      { ...translateBody, format: "text" }
    );

    return res.send(data);
  });

  done();
};

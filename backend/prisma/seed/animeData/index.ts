import dataFeederRawAnime from "../../../src/grpc/clients/dataFeederRawAnime";
import type { RawAnime__Output } from "../../../src/grpc/pb/raw_anime/RawAnime";
import { RawAnimeSynopsis__Output } from "../../../src/grpc/pb/raw_anime/RawAnimeSynopsis";
import prisma from "../../client";
import { parseRawAnime, parseRawAnimeSynopsis } from "./parsers";

async function execute() {
  try {
    await handleRawAnimeStream();
    await handleRawAnimeSynopsisStream();
  } catch (error) {
    console.log(error);
  }
}

function handleRawAnimeStream() {
  return new Promise<void>((resolve, reject) => {
    const stream = dataFeederRawAnime.fetchRawAnimes({});

    stream.on("data", (rawAnime: RawAnime__Output) => {
      const parsedAnime = parseRawAnime(rawAnime);

      prisma.anime
        .upsert({
          where: {
            malId: parsedAnime.malId,
          },
          create: parsedAnime,
          update: parsedAnime,
        })
        .then();

      console.log(`Created => ${parsedAnime.malId}: ${parsedAnime.name}`);
    });

    stream.on("error", (err) => {
      reject(err.toString());
    });

    stream.on("end", () => {
      console.log("done creating!");
      resolve();
    });
  });
}

function handleRawAnimeSynopsisStream() {
  return new Promise<void>((resolve, reject) => {
    const stream = dataFeederRawAnime.fetchRawAnimesSynopsis({});

    stream.on("data", (rawAnimeSynopsis: RawAnimeSynopsis__Output) => {
      prisma.anime
        .update({
          where: {
            malId: rawAnimeSynopsis.malId,
          },
          data: {
            synopsis: rawAnimeSynopsis.synopsis,
          },
        })
        .then();

      console.log(`Updated (synopsis) => ${rawAnimeSynopsis.malId}`);
    });

    stream.on("error", (err) => {
      reject(err.toString());
    });

    stream.on("end", () => {
      console.log("done updating!");
      resolve();
    });
  });
}

export default {
  execute,
};

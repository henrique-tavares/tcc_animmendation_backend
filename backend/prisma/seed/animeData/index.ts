import { Prisma } from "@prisma/client";
import fs from "fs";
import Papa from "papaparse";
import path from "path";
import { RawAnime } from "../../../src/types/data/anime";
import prisma from "../../client";
import {
  parseAnimeData,
  parseIntegerConversion,
  parseSynopsis,
  parseUnknown,
} from "./parsers";

async function execute() {
  const animeDatasetReadstream = fs.createReadStream(
    path.resolve(__dirname, "../../../datasets/anime.csv")
  );
  Papa.parse<RawAnime>(animeDatasetReadstream, {
    header: true,
    step(row) {
      const { data: rawAnimeData } = row;

      const [startDate, endDate = ""] = rawAnimeData.Aired.split(" to ");
      const parsedStartDate = parseAnimeData(startDate);
      const parsedEndDate = parseAnimeData(endDate);
      const parsedStudios = parseUnknown(rawAnimeData.Studios)
        ?.replaceAll('"', "")
        ?.split(", ");

      const animeCreateData: Prisma.AnimeCreateInput = {
        malId: Number(rawAnimeData.MalId),
        name: rawAnimeData.Name,
        score: parseIntegerConversion(rawAnimeData.Score),
        japaneseName: parseUnknown(rawAnimeData.JapaneseName),
        type: parseUnknown(rawAnimeData.Type),
        episodes: parseIntegerConversion(rawAnimeData.Episodes),
        broadcastStartDate:
          parsedStartDate && parsedEndDate
            ? parsedStartDate.toISOString()
            : null,
        broadcastEndDate:
          parsedStartDate && parsedEndDate ? parsedEndDate.toISOString() : null,
        releaseDate:
          parsedStartDate && !parsedEndDate
            ? parsedStartDate.toISOString()
            : null,
        studios: parsedStudios,
        source: parseUnknown(rawAnimeData.Source),
        ageClassification: parseUnknown(rawAnimeData.Rating),
        popularity: parseIntegerConversion(rawAnimeData.Popularity),
        watching: parseIntegerConversion(rawAnimeData.Watching),
        synopsis: parseSynopsis(rawAnimeData.Synopsis),
      };

      prisma.anime
        .upsert({
          create: animeCreateData,
          update: animeCreateData,
          where: {
            malId: animeCreateData.malId,
          },
        })
        .then((createdAnime) => {
          console.log(`Created => ${createdAnime.malId}: ${createdAnime.name}`);
        });
    },
    complete() {
      console.log("done!");
    },
  });
}

export default {
  execute,
};

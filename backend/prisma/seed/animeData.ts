import { Prisma } from "@prisma/client";
import prisma from "../client";
import { checkDbHasData } from "./utils";
import * as Papa from "papaparse";

async function execute() {
  const dbHasData = await checkDbHasData("Anime");
  if (dbHasData) {
    console.log("There already exists data in table Anime");
    return;
  }

  const result = await prisma.$executeRaw`
    COPY public."Anime"("malId", name, score, genres, "japaneseName", type, episodes, studios, source, "ageClassification", popularity, watching, synopsis, "broadcastStartDate", "broadcastEndDate", "releaseDate")
    FROM '/datasets/handler/anime_data/data.csv'
    WITH (FORMAT CSV, HEADER)
  `;

  console.log(`Copied ${result} rows to Anime table!`);
}

export default {
  execute,
};

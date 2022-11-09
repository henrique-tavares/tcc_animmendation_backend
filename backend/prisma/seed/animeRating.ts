import prisma from "../client";
import { checkDbHasData } from "./utils";

async function execute() {
  const dbHasData = await checkDbHasData("AnimeRating");
  if (dbHasData) {
    console.log("There already exists data in table AnimeRating");
    return;
  }

  const result = await prisma.$executeRaw`
    COPY public."AnimeRating"(id, "userId", "animeId", rating, "watchingStatus", "watchedEpisodes")
    FROM '/datasets/handler/anime_rating/data.csv'
    WITH (FORMAT CSV, HEADER)
  `;

  console.log(`Copied ${result} rows to table AnimeRating!`);
}

export default {
  execute,
};

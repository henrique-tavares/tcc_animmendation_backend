import prisma from "../client";
import { checkDbHasData } from "./utils";

async function execute() {
  const dbHasData = await checkDbHasData("anime");
  if (dbHasData) {
    await prisma.$executeRaw`TRUNCATE animes CASCADE`;

    console.log("Table animes truncated!");
  }

  console.log(`Copying data to animes table!`);

  const result = await prisma.$executeRaw`
    COPY public.animes(id,title,score,alternative_titles,picture,status,media_type,start_date,end_date,released_season,genres,synopsis,age_classification,source,studios,episodes,rank,popularity,nsfw,related_anime)
    FROM '/datasets/animes.csv'
    WITH (FORMAT CSV, HEADER)
  `;

  console.log(`Copied ${result} rows to animes table!`);
}

export default {
  execute,
};

import { exit } from "process";
import animeData from "./animeData";
import animeRating from "./animeRating";
import { cleanDatasets } from "./utils";

async function main() {
  if (process.env.SEED_ANIME?.match(/true/i)) {
    await animeData.execute();
  }

  if (process.env.SEED_ANIME_RATING?.match(/true/i)) {
    await animeRating.execute();
  }

  // await cleanDatasets();
}

main().catch((e) => {
  console.error(e);
  exit(1);
});

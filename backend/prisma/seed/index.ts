import fs from "fs";
import path from "path";
import { exit } from "process";
import animeData from "./animeData";
import prepareData from "./prepareData";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  if (
    !fs.existsSync(
      path.resolve(__dirname, "../../datasets/treated/anime_complete.csv")
    )
  ) {
    await prepareData.execute();
  }

  await animeData.execute();
}

main().catch((e) => {
  console.error(e), exit(1);
});

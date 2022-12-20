import { exit } from "process";
import animes from "./animes";
import datasetsDownloader from "./datasetsDownloader";
import { cleanDatasets } from "./utils";
import prisma from "../client";

async function main() {
  const { animeDownloaded } = await datasetsDownloader.execute();

  if (animeDownloaded) {
    await animes.execute();
    await prisma.seedTracking.upsert({
      where: {
        model: "Anime",
      },
      create: {
        model: "Anime",
        lastSeeded: new Date(),
      },
      update: {
        lastSeeded: new Date(),
      },
    });
  } else {
    console.log("Dataset for Anime is up to date");
  }

  await cleanDatasets();
}

main()
  .then(() => {
    exit(0);
  })
  .catch((e) => {
    console.error(e);
    exit(1);
  });

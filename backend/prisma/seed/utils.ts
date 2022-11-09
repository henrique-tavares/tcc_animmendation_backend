import { Dir } from "fs";
import fsp from "fs/promises";
import path from "path";
import prisma from "../client";

export async function cleanDatasets() {
  const datasetPath = "../../data/datasets/handler";

  const dir = await fsp.opendir(path.resolve(__dirname, datasetPath));
  await recursiveDatasetRemove(dir);

  console.log("Datasets removed.");
}

async function recursiveDatasetRemove(dir: Dir) {
  for await (const dirEntry of dir) {
    if (dirEntry.isDirectory()) {
      recursiveDatasetRemove(
        await fsp.opendir(path.resolve(dir.path, dirEntry.name))
      );
      continue;
    }

    if (dirEntry.isFile() && dirEntry.name == "data.csv") {
      await fsp.unlink(path.resolve(dir.path, dirEntry.name));
      await fsp
        .open(path.resolve(dir.path, ".initialized"), "a")
        .then((file) => {
          file.close();
        });
    }
  }
}

export async function checkDbHasData(prismaTable: "Anime" | "AnimeRating") {
  const prismaTablesFirst = {
    Anime: prisma.anime.findFirst(),
    AnimeRating: prisma.animeRating.findFirst(),
  };

  const result = await prismaTablesFirst[prismaTable];

  return Boolean(result);
}

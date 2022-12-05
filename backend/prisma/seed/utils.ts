import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import prisma from "../client";

export async function cleanDatasets() {
  const datasetPath = "../../datasets";
  const files = ["animes.csv"];

  for (const file of files) {
    const filePath = path.resolve(__dirname, datasetPath, file);
    if (!fs.existsSync(filePath)) {
      continue;
    }

    await fsp.unlink(filePath);
    console.log(`Dataset '${filePath}' removed.`);
  }
}

export async function checkDbHasData(prismaTable: "anime") {
  const prismaTablesFirst = {
    anime: prisma.anime.findFirst(),
  };

  const result = await prismaTablesFirst[prismaTable];

  return Boolean(result);
}

import path from "path";
import prisma from "./prisma/client";
import { makeRecommenderDatasets } from "./src/services/prepareRecommender";
import sftpClient from "ssh2-sftp-client";
import fs from "fs";
import fsp from "fs/promises";
import { cleanDatasets } from "./prisma/seed/utils";

async function main() {
  await cleanDatasets();
}

main().catch((err) => {
  console.error(err);
});

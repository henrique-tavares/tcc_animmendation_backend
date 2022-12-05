import { Models } from "@prisma/client";
import path from "path";
import SftpClient from "ssh2-sftp-client";
import prisma from "../client";

async function execute() {
  const sftp = new SftpClient();

  const connectArgs: SftpClient.ConnectOptions = {
    host: process.env.SFTP_HOST,
    port: Number(process.env.SFTP_PORT),
    username: process.env.SFTP_USERNAME,
    password: process.env.SFTP_PASSWORD,
  };
  validateObject(connectArgs);

  const files = {
    animesPath: process.env.SFTP_ANIMES_PATH,
  };
  validateObject(files);

  await sftp.connect(connectArgs);

  const animeDownloaded = await downloadDataset(
    sftp,
    files.animesPath as string,
    "Anime",
    path.resolve(__dirname, "../../datasets/animes.csv")
  );

  return { animeDownloaded };
}

async function downloadDataset(
  sftp: SftpClient,
  filePath: string,
  model: Models,
  dest: string,
  force: boolean = false
) {
  if (!force) {
    const { modifyTime } = await sftp.stat(filePath);

    const lastSeeded = await prisma.seedTracking.findUnique({
      where: { model },
    });

    if (lastSeeded != null && modifyTime <= lastSeeded.lastSeeded.valueOf()) {
      return false;
    }
  }
  console.log(`Downloading '${filePath}'`);
  await sftp.fastGet(filePath, dest);
  console.log(`Finished downloading '${filePath}'`);
  return true;
}

function validateObject(obj: Record<string, any>) {
  Object.entries(obj).forEach(([key, value]) => {
    if (Number.isNaN(value)) {
      throw new Error(`${key} is NaN`);
    }

    if (value == undefined) {
      throw new Error(`${key} is undefined`);
    }
  });
}

export default {
  execute,
};

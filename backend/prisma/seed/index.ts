import { exit } from "process";
import animeData from "./animeData";

async function main() {
  await animeData.execute();
}

main().catch((e) => {
  console.error(e), exit(1);
});

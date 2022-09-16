import { Prisma } from "@prisma/client";
import _ from "lodash";

export function checkScoreNotNull(animeData: Prisma.AnimeCreateInput) {
  return _.isNil(animeData.score);
}

import { Anime as PrismaAnime } from "@prisma/client";
import _ from "lodash";
import {
  AnimeAgeClassificationEnum,
  AnimeMediaTypeEnum,
  AnimeStatusEnum,
} from "../objects/enums";
import { Anime } from "../objects/Anime";

export default (anime: PrismaAnime): Anime => {
  return {
    ...anime,
    status: AnimeStatusEnum[anime.status],
    mediaType: AnimeMediaTypeEnum[anime.mediaType],
    ageClassification: anime.ageClassification
      ? AnimeAgeClassificationEnum[anime.ageClassification]
      : null,
  };
};

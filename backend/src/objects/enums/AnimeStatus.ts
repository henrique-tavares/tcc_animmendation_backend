import { registerEnumType } from "type-graphql";

export enum AnimeStatusEnum {
  AIRING = "AIRING",
  FINISHED = "FINISHED",
}

registerEnumType(AnimeStatusEnum, {
  name: "AnimeStatus",
  description: "The status of an Anime",
});

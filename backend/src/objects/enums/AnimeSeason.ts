import { registerEnumType } from "type-graphql";

export enum AnimeSeasonEnum {
  WINTER = "winter",
  SPRING = "spring",
  SUMMER = "summer",
  FALL = "fall",
}

registerEnumType(AnimeSeasonEnum, {
  name: "AnimeSeason",
  description: "The seasons in which Animes are released",
});

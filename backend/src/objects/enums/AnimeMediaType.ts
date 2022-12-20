import { registerEnumType } from "type-graphql";

export enum AnimeMediaTypeEnum {
  TV = "TV",
  MOVIE = "MOVIE",
  OVA = "OVA",
  ONA = "ONA",
  SPECIAL = "SPECIAL",
}

registerEnumType(AnimeMediaTypeEnum, {
  name: "AnimeMediaType",
  description: "The media type of an Anime",
});

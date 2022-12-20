import { registerEnumType } from "type-graphql";

export enum AnimeAgeClassificationEnum {
  G = "G",
  PG = "PG",
  PG_13 = "PG_13",
  R = "R",
  R_PLUS = "R_PLUS",
  RX = "RX",
}

registerEnumType(AnimeAgeClassificationEnum, {
  name: "AnimeAgeClassification",
  description: "The age classification of an Anime",
});

import { registerEnumType } from "type-graphql";

export enum AnimeOrderByEnum {
  SCORE,
  POPULARITY,
}

registerEnumType(AnimeOrderByEnum, {
  name: "AnimeOrderBy",
  description: "Ways to order a list of anime",
});

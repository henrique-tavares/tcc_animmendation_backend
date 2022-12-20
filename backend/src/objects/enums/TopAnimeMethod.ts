import { registerEnumType } from "type-graphql";

export enum TopAnimeMethodEnum {
  SCORE,
  POPULARITY,
}

registerEnumType(TopAnimeMethodEnum, {
  name: "TopAnimeMethod",
  description: "Criteria for getting popular Anime",
});

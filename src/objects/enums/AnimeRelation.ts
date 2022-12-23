import { registerEnumType } from "type-graphql";

export enum AnimeRelationEnum {
  sequel = "sequel",
  prequel = "prequel",
  alternative_setting = "alternative_setting",
  alternative_version = "alternative_version",
  side_story = "side_story",
  character = "character",
  spin_off = "spin_off",
  parent_story = "parent_story",
  summary = "summary",
  full_story = "full_story",
  other = "other",
}

registerEnumType(AnimeRelationEnum, {
  name: "AnimeRelation",
  description: "The relation between animes",
});

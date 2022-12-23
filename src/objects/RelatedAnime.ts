import { AnimeMediaType } from "@prisma/client";
import { Field, Float, Int, ObjectType } from "type-graphql";
import { AnimeMediaTypeEnum } from "./enums";
import { AnimeRelationEnum } from "./enums/AnimeRelation";

@ObjectType({
  description: "Object representing a related anime",
})
export class RelatedAnime {
  @Field((type) => Int)
  id!: number;

  @Field((type) => String)
  title!: string;

  @Field((type) => Float)
  score!: number;

  @Field((type) => Int, { nullable: true })
  popularity!: number | null;

  @Field((type) => String, { nullable: true })
  picture!: string | null;

  @Field((type) => AnimeMediaTypeEnum, { nullable: true })
  mediaType!: AnimeMediaTypeEnum | null;

  @Field((type) => [String], { nullable: true })
  genres!: string[] | null;

  @Field((type) => AnimeRelationEnum)
  relation!: AnimeRelationEnum;
}

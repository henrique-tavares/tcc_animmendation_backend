import { Field, Float, Int, ObjectType } from "type-graphql";
import { IsInt, IsPositive, Max, Min, IsUrl } from "class-validator";
import {
  AnimeAgeClassificationEnum,
  AnimeMediaTypeEnum,
  AnimeStatusEnum,
} from "./enums";

@ObjectType({
  description: "Object representing an Anime",
})
export class Anime {
  @Field((type) => Int)
  @IsPositive()
  @IsInt()
  id!: number;

  @Field()
  title!: string;

  @Field((type) => Float)
  @Min(0)
  @Max(10)
  score!: number;

  @Field((type) => [String])
  alternativeTitles!: string[];

  @Field((type) => String, { nullable: true })
  @IsUrl()
  picture!: string | null;

  @Field((type) => AnimeStatusEnum)
  status!: AnimeStatusEnum;

  @Field((type) => AnimeMediaTypeEnum, { nullable: true })
  mediaType!: AnimeMediaTypeEnum | null;

  @Field((type) => Date, { nullable: true })
  startDate!: Date | null;

  @Field((type) => Date, { nullable: true })
  endDate!: Date | null;

  @Field((type) => String, { nullable: true })
  releasedSeason!: string | null;

  @Field((type) => [String], { defaultValue: [] })
  genres!: string[] | null;

  @Field((type) => String, { nullable: true })
  synopsis!: string | null;

  @Field((type) => AnimeAgeClassificationEnum, { nullable: true })
  ageClassification!: AnimeAgeClassificationEnum | null;

  @Field((type) => [String], { defaultValue: [] })
  studios!: string[];

  @Field((type) => String, { nullable: true })
  source!: string | null;

  @Field((type) => Int, { nullable: true })
  @IsPositive()
  @IsInt()
  episodes!: number | null;

  @Field((type) => Int, { nullable: true })
  @IsPositive()
  @IsInt()
  rank!: number | null;

  @Field((type) => Int, { nullable: true })
  @IsPositive()
  @IsInt()
  popularity!: number | null;

  @Field((type) => String, { nullable: true })
  nsfw!: string | null;

  @Field((type) => [String], { defaultValue: [] })
  relatedAnime!: string[];
}

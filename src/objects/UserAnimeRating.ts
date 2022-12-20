import { IsPositive, IsInt, Max, Min } from "class-validator";
import { Field, Int, ObjectType } from "type-graphql";
import { Anime } from "./Anime";
import { UserRatingStatusEnum } from "./enums/UserRatingStatus";

@ObjectType({
  description: "Object representing an user's anime rating",
})
export class UserAnimeRating {
  @Field((type) => Anime)
  anime!: Anime;

  @Field((type) => Int)
  @Min(0)
  @Max(10)
  score!: number;

  @Field((type) => UserRatingStatusEnum, { nullable: true })
  status!: UserRatingStatusEnum | null;
}

import { IsInt, IsPositive } from "class-validator";
import { Field, Int, ObjectType } from "type-graphql";
import { Anime } from "./Anime";

@ObjectType({
  description: "Object representing a single Anime recommendation",
})
export class Recommendation {
  @Field((type) => Anime)
  anime!: Anime;

  @Field((type) => Int)
  @IsPositive()
  @IsInt()
  rank!: number;
}

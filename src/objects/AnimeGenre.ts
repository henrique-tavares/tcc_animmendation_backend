import { Field, Int, ObjectType } from "type-graphql";

@ObjectType({
  description: "Object representing an anime genre query",
})
export class AnimeGenre {
  @Field((type) => String)
  genre!: string;

  @Field((type) => Int)
  count!: number;
}

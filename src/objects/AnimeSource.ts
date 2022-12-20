import { Field, Int, ObjectType } from "type-graphql";

@ObjectType({
  description: "Object representing an anime source query",
})
export class AnimeSource {
  @Field((type) => String)
  source!: string;

  @Field((type) => Int)
  count!: number;
}

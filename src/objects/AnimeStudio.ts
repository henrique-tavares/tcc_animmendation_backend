import { Field, Int, ObjectType } from "type-graphql";

@ObjectType({
  description: "Object representing an anime studio query",
})
export class AnimeStudio {
  @Field((type) => String)
  studio!: string;

  @Field((type) => Int)
  count!: number;
}

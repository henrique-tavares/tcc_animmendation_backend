import { Field, Int, ObjectType } from "type-graphql";

@ObjectType({
  description: "Object representing an anime's titles",
})
export class AnimeTitles {
  @Field((type) => Int)
  animeId!: number;

  @Field((type) => [String])
  title!: string;
}

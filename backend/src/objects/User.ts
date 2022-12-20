import { Field, ObjectType } from "type-graphql";
import { UserAnimeRating } from "./UserAnimeRating";

@ObjectType({
  description: "Object representing an user",
})
export class User {
  @Field()
  id!: number;

  @Field()
  username!: string;

  @Field((type) => String, { nullable: true })
  imageURL?: string;

  // @Field((type) => [UserAnimeRating])
  // animeList!: UserAnimeRating[];
}

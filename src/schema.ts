import { buildSchemaSync } from "type-graphql";
import {
  AnimeResolver,
  RecommendationResolver,
  UserResolver,
} from "./resolvers";

export const schema = buildSchemaSync({
  resolvers: [AnimeResolver, RecommendationResolver, UserResolver],
  dateScalarMode: "isoDate",
  emitSchemaFile: true,
});

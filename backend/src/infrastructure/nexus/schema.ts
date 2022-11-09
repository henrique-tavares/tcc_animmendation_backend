import { makeSchema } from "nexus";
import path from "path";
import * as types from "./graphql";

export const schema = makeSchema({
  types,
  outputs: {
    schema: path.resolve(__dirname, "./schema.graphql"),
    typegen: path.resolve(__dirname, "./nexus-typegen.ts"),
  },
  contextType: {
    module: path.resolve(__dirname, "./context.ts"),
    export: "Context",
  },
});

import { booleanArg, intArg, extendType, nullable, nonNull } from "nexus";
import { resolve } from "../../usecases/trainRecommender";

export const Train = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("train", {
      type: "Boolean",
      args: {
        scored: nonNull(booleanArg()),
        notDropped: nonNull(booleanArg()),
        watched: nonNull(booleanArg()),
        positiveRating: nonNull(booleanArg()),
        ratingThreshold: nullable(intArg()),
      },

      resolve,
    });
  },
});
//   (t) => {
//   t.field("train", {
//     type: "Boolean",
//     args: {
//       unscored: nullable(booleanArg()),
//       dropped: nullable(booleanArg()),
//       notWatched: nullable(booleanArg()),
//       ratingThreshold: nullable(intArg()),
//     },
//   });
// }

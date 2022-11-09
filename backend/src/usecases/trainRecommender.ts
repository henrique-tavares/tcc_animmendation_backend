import { ClientWritableStream } from "@grpc/grpc-js";
import { Anime, AnimeRating, prisma, Prisma } from "@prisma/client";
import { head, isNil, last } from "lodash";
import { FieldResolver } from "nexus";
// import recommendationClient from "../grpc/clients/recommendationAnime";
// import { AnimeRating as GrpcAnimeRating } from "../grpc/pb/anime/AnimeRating";
import {
  filterAnimeId,
  filterAnimeRatingUser,
} from "../services/trainRecommender/filters";

export const resolve: FieldResolver<"Mutation", "train"> = async (
  parent,
  args,
  context
) => {
  try {
    // const { notDropped, positiveRating, scored, watched } = args;

    // console.log(args);

    const excludedAnimeIds = await filterAnimeId(context.prisma);

    const excludedUserIds = await filterAnimeRatingUser(
      context.prisma,
      30,
      excludedAnimeIds
    );

    const chunkSize = 100_000;
    let cursorId: number | undefined = undefined;

    // do {
    //   const res: AnimeRating[] = await context.prisma.animeRating.findMany({
    //     where: {
    //       // userId: {
    //       //   notIn: excludedUserIds,
    //       // },
    //       // animeId: {
    //       //   notIn: excludedAnimeIds,
    //       // },
    //       watchingStatus: {
    //         not: "PLAN_TO_WATCH",
    //       },
    //     },
    //     cursor: !isNil(cursorId)
    //       ? {
    //           id: cursorId,
    //         }
    //       : undefined,
    //     skip: !isNil(cursorId) ? 1 : undefined,
    //     take: chunkSize,
    //   });

    //   cursorId = last(res)?.id;
    //   console.log(res);
    //   // const filteredRes = res.filter(
    //   //   (e) =>
    //   //     !excludedAnimeIds.includes(e.animeId) &&
    //   //     !excludedUserIds.includes(e.userId)
    //   // );
    //   // console.log(filteredRes);
    // } while (!isNil(cursorId));

    // const animeRatingWritable = recommendationClient.fetchAnimeRating(
    //   (err, res) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }

    //     console.log(`train completed with (${res})`);
    //   }
    // );

    // const findManyArgs: Prisma.AnimeRatingFindManyArgs = {
    //   select: {
    //     id: true,
    //     animeId: true,
    //     userId: true,
    //     rating: true,
    //   },
    //   where: {
    //     userId: {
    //       // in: {

    //       // }
    //     },
    //     rating: {
    //       not: scored && !positiveRating ? 0 : undefined,
    //       gt: positiveRating ? 5 : undefined,
    //     },
    //     watchedEpisodes: {
    //       not: watched ? 0 : undefined,
    //     },
    //     AND: [
    //       {
    //         watchingStatus: {
    //           not: watched ? "PLAN_TO_WATCH" : undefined,
    //         },
    //       },
    //       {
    //         watchingStatus: {
    //           not: notDropped ? "DROPPED" : undefined,
    //         },
    //       },
    //     ],
    //   },
    // };

    // try {
    //   const chunkSize = 100_000;
    //   let cursorId: number | undefined = undefined;

    //   do {
    //     const res: AnimeRating[] = await context.prisma.animeRating.findMany({
    //       ...findManyArgs,
    //       skip: !isNil(cursorId) ? 1 : undefined,
    //       take: chunkSize,
    //       cursor: !isNil(cursorId)
    //         ? {
    //             id: cursorId,
    //           }
    //         : undefined,
    //     });

    //     const lastAnime = last(res);
    //     cursorId = lastAnime?.id;
    //     console.log(cursorId, lastAnime);
    //     handleStreamWriteChunk(animeRatingWritable, res);
    //   } while (!isNil(cursorId));
    // } catch (error) {
    //   console.error(error);
    // }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// function handleStreamWriteChunk(
//   stream: ClientWritableStream<GrpcAnimeRating>,
//   data: AnimeRating[]
// ) {
//   for (const animeRating of data) {
//     const grpcAnimeRating: GrpcAnimeRating = {
//       animeId: animeRating.animeId,
//       userId: animeRating.userId,
//       rating: animeRating.rating,
//     };
//     const full = stream.write(grpcAnimeRating);
//     if (full) {
//       stream.once("drain", () => {});
//     }
//   }
// }

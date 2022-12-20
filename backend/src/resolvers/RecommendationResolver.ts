import { Arg, Int, Query, Resolver } from "type-graphql";
import prisma from "../../prisma/client";
import recommender from "../infrastructure/grpc/clients/recommender";
import {
  AnimeAgeClassificationEnum,
  AnimeMediaTypeEnum,
} from "../objects/enums";
import { DateMethodEnum } from "../objects/enums/DateMethod";
import { Recommendation } from "../objects/Recommendation";
import convertAnime from "../utils/convertAnime";
import { GqlError } from "../utils/GqlError";

@Resolver(Recommendation)
export class RecommendationResolver {
  @Query((returns) => [Recommendation])
  async getAnimeRecommendations(
    @Arg("animeId", (type) => Int) animeId: number,
    @Arg("k", (type) => Int) k: number,
    @Arg("excludedAnimeIds", (type) => [Int]) excludedAnimeIds: number[]
  ): Promise<Recommendation[]> {
    const validAnime = await prisma.anime.findUnique({
      where: {
        id: animeId,
      },
      select: {
        id: true,
      },
    });

    if (!validAnime) {
      throw GqlError("Invalid Anime Id", 404, {
        code: "NOT_FOUND",
        animeId,
      });
    }

    const res = await recommender.getRecommendations({
      animeId,
      k,
      excludedAnimeIds,
    });

    if (!res) {
      throw GqlError(
        `Couldn't get the recommendations for anime (${animeId})`,
        500
      );
    }

    const recommendations = await Promise.all(
      res.recommendations.map(async ({ recommendedAnimeId, rank }) => {
        const recommendedAnime = await prisma.anime.findUnique({
          where: {
            id: recommendedAnimeId,
          },
        });

        if (!recommendedAnime) {
          throw GqlError(
            `The recommended anime (${recommendedAnimeId}) does not exist'`,
            404
          );
        }

        return {
          anime: recommendedAnime,
          rank,
        };
      })
    );

    return recommendations.map((recommendation) => ({
      anime: convertAnime(recommendation.anime),
      rank: recommendation.rank,
    }));
  }

  @Query((returns) => [Recommendation])
  async getGroupRecommendations(
    @Arg("animesId", (type) => [Int]) animesId: number[],
    @Arg("amount", (type) => Int) amount: number,
    @Arg("excludedAnimeIds", (type) => [Int]) excludedAnimeIds: number[],
    @Arg("genres", (type) => [String], { nullable: true }) genres?: string[],
    @Arg("mediaTypes", (type) => [AnimeMediaTypeEnum], { nullable: true })
    mediaTypes?: AnimeMediaTypeEnum[],
    @Arg("ages", (type) => [AnimeAgeClassificationEnum], { nullable: true })
    ages?: AnimeAgeClassificationEnum[],
    @Arg("sources", (type) => [String], { nullable: true }) sources?: string[],
    @Arg("studios", (type) => [String], { nullable: true }) studios?: string[],
    @Arg("startDate", (type) => Date, { nullable: true })
    startDate?: Date,
    @Arg("startDateMethod", (type) => DateMethodEnum, { nullable: true })
    startDateMethod?: DateMethodEnum,
    @Arg("endDate", (type) => Date, { nullable: true })
    endDate?: Date,
    @Arg("endDateMethod", (type) => DateMethodEnum, { nullable: true })
    endDateMethod?: DateMethodEnum,
    @Arg("nullEndDate", (type) => Boolean, { defaultValue: false })
    nullEndDate: boolean = false,
    @Arg("hentai", { defaultValue: false }) hentai: boolean = false
  ): Promise<Recommendation[]> {
    // for (const animeId of animesId) {
    //   const validAnime = await prisma.anime.findUnique({
    //     where: {
    //       id: animeId,
    //     },
    //     select: {
    //       id: true,
    //     },
    //   });

    //   if (!validAnime) {
    //     throw GqlError(`Invalid Anime Id (${animeId})`, 404);
    //   }
    // }

    const res = await recommender.getGroupRecommendations({
      animeIds: animesId,
      excludedAnimeIds,
    });

    if (!res) {
      throw GqlError(
        `Couldn't get the recommendations for the animes (${animesId})`,
        500
      );
    }

    const recommendedAnimeMap = new Map(
      res.recommendations.map((rec) => [rec.recommendedAnimeId, rec.rank])
    );

    // const recommendations = await Promise.all(
    //   res.recommendations.map(async ({ recommendedAnimeId, rank }) => {
    const recommendedAnime = await prisma.anime.findMany({
      where: {
        id: {
          in: [...recommendedAnimeMap.keys()],
        },
        mediaType: {
          in: mediaTypes,
        },
        genres: genres
          ? {
              hasSome: genres,
            }
          : undefined,
        ageClassification: {
          in: ages,
        },
        source: {
          in: sources,
        },
        studios: studios
          ? {
              hasSome: studios,
            }
          : undefined,
        startDate: startDateMethod
          ? {
              [startDateMethod]: startDate,
            }
          : undefined,
        OR:
          (endDate && endDateMethod) || nullEndDate
            ? [
                {
                  endDate: endDateMethod
                    ? {
                        [endDateMethod]: endDate,
                      }
                    : undefined,
                },
                {
                  endDate: {
                    equals: nullEndDate ? null : undefined,
                  },
                },
              ]
            : undefined,
        NOT: {
          genres: {
            has: hentai ? undefined : "Hentai",
          },
        },
      },
    });

    const sortedRecomendedAnime = recommendedAnime
      .map((anime) => ({ anime, rank: recommendedAnimeMap.get(anime.id)! }))
      .sort((a, b) => a.rank - b.rank)
      .slice(0, amount);

    //     if (!recommendedAnime) {
    //       throw GqlError(
    //         `The recommended anime (${recommendedAnimeId}) does not exist'`,
    //         404
    //       );
    //     }

    //     return {
    //       anime: recommendedAnime,
    //       rank,
    //     };
    //   })
    // );

    return sortedRecomendedAnime.map((recommendation) => ({
      anime: convertAnime(recommendation.anime),
      rank: recommendation.rank,
    }));
  }
}

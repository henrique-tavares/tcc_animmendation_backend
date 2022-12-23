import { Prisma } from "@prisma/client";
import Fuse from "fuse.js";
import { Arg, Int, Query, Resolver } from "type-graphql";
import prisma from "../../prisma/client";
import { redisClient } from "../infrastructure/redis/client";
import {
  seedAnimeGenres,
  seedAnimeSources,
  seedAnimeStudios,
  seedAnimeTitles,
} from "../infrastructure/redis/seeders";
import { Anime } from "../objects/Anime";
import { AnimeGenre } from "../objects/AnimeGenre";
import { AnimeSource } from "../objects/AnimeSource";
import { AnimeStudio } from "../objects/AnimeStudio";
import { AnimeTitles } from "../objects/AnimeTitles";
import {
  AnimeAgeClassificationEnum,
  AnimeMediaTypeEnum,
  AnimeOrderByEnum,
  AnimeSeasonEnum,
  AnimeStatusEnum,
  TopAnimeMethodEnum,
} from "../objects/enums";
import { AnimeRelationEnum } from "../objects/enums/AnimeRelation";
import { DateMethodEnum } from "../objects/enums/DateMethod";
import { RelatedAnime } from "../objects/RelatedAnime";
import convertAnime from "../utils/convertAnime";
import { GqlError } from "../utils/GqlError";
@Resolver(Anime)
export class AnimeResolver {
  @Query((returns) => Anime)
  async getAnimeById(@Arg("id", (type) => Int) id: number): Promise<Anime> {
    const anime = await prisma.anime.findUnique({
      where: {
        id,
      },
    });

    if (!anime) {
      throw GqlError("Invalid Anime Id", 404, {
        code: "NOT_FOUND",
        animeId: id,
        timestamp: Math.round(new Date().getTime() / 1000),
      });
    }

    return convertAnime(anime);
  }

  @Query((returns) => [Anime])
  async getAnimeByTitle(
    @Arg("title", (type) => String) title: string,
    @Arg("hentai", { defaultValue: false }) hentai: boolean = false
  ): Promise<Anime[]> {
    const animes = await prisma.anime.findMany({
      where: {
        title: {
          equals: title,
        },
        NOT: {
          genres: {
            has: hentai ? undefined : "Hentai",
          },
        },
      },
    });

    return animes.map(convertAnime);
  }

  @Query((returns) => [Anime])
  async getAnimeBySeason(
    @Arg("season", (type) => AnimeSeasonEnum)
    season: AnimeSeasonEnum,
    @Arg("year", (type) => Int) year: number,
    @Arg("method", (type) => TopAnimeMethodEnum, {
      defaultValue: TopAnimeMethodEnum.POPULARITY,
    })
    method: TopAnimeMethodEnum,
    @Arg("mediaTypes", (type) => [AnimeMediaTypeEnum], { nullable: true })
    mediaTypes?: AnimeMediaTypeEnum[],
    @Arg("amount", (type) => Int, { nullable: true }) amount?: number,
    @Arg("hentai", { defaultValue: false }) hentai: boolean = false
  ): Promise<Anime[]> {
    const orderByParser: Record<
      TopAnimeMethodEnum,
      Prisma.AnimeOrderByWithRelationInput
    > = {
      [AnimeOrderByEnum.POPULARITY]: {
        popularity: "asc",
      },
      [AnimeOrderByEnum.SCORE]: {
        score: "desc",
      },
    };

    const animes = await prisma.anime.findMany({
      where: {
        releasedSeason: {
          equals: `${season}, ${year}`,
        },
        mediaType: {
          in: mediaTypes,
        },
        NOT: {
          genres: {
            has: hentai ? undefined : "Hentai",
          },
        },
      },
      orderBy: orderByParser[method],
      take: amount,
    });

    return animes.map(convertAnime);
  }

  @Query((returns) => [Anime])
  async getTopAnime(
    @Arg("method", (type) => TopAnimeMethodEnum) method: TopAnimeMethodEnum,
    @Arg("title", (type) => String, { nullable: true }) title?: string,
    @Arg("status", (type) => AnimeStatusEnum, { nullable: true })
    status?: AnimeStatusEnum,
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
    @Arg("amount", (type) => Int, { defaultValue: 100 }) amount: number = 100,
    @Arg("offset", (type) => Int, { nullable: true }) offset?: number,
    @Arg("hentai", { defaultValue: false }) hentai: boolean = false
  ): Promise<Anime[]> {
    const orderByParser: Record<
      TopAnimeMethodEnum,
      Prisma.AnimeOrderByWithRelationInput
    > = {
      [AnimeOrderByEnum.POPULARITY]: {
        popularity: "asc",
      },
      [AnimeOrderByEnum.SCORE]: {
        score: "desc",
      },
    };

    // let animeIdsScoreMap: Map<number, number> | undefined = undefined;
    // if (title && title.length >= 3) {
    //   const animeTitles = await this.getAllAnimeTitles();
    //   console.log(animeTitles);
    //   const fuse = new Fuse(animeTitles, {
    //     keys: ["title"],
    //     includeScore: true,
    //     ignoreLocation: true,
    //     threshold: 0.25,
    //   });

    //   const res = fuse.search(title);
    //   console.log(res);
    //   animeIdsScoreMap = new Map(
    //     res.map((match) => [match.item.animeId, match.score!])
    //   );
    // }

    try {
      const animes = await prisma.anime.findMany({
        where: {
          title: {
            contains: title,
            mode: "insensitive",
          },
          status: {
            equals: status,
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
        orderBy: orderByParser[method],
        take: amount,
        skip: offset,
      });

      // if (animeIdsScoreMap) {
      //   animes.sort(
      //     (a, b) => animeIdsScoreMap!.get(a.id)! - animeIdsScoreMap!.get(b.id)!
      //   );
      // }

      return animes.map(convertAnime);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  @Query((returns) => [Anime])
  async listAnimeById(
    @Arg("ids", (type) => [Int]) ids: number[],
    @Arg("method", (type) => TopAnimeMethodEnum) method: TopAnimeMethodEnum
  ): Promise<Anime[]> {
    const orderByParser: Record<
      TopAnimeMethodEnum,
      Prisma.AnimeOrderByWithRelationInput
    > = {
      [AnimeOrderByEnum.POPULARITY]: {
        popularity: "asc",
      },
      [AnimeOrderByEnum.SCORE]: {
        score: "desc",
      },
    };

    const animes = await prisma.anime.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      orderBy: orderByParser[method],
    });

    const foundIds = new Set(animes.map((anime) => anime.id));
    const expectedIds = new Set(ids);

    const diffIds = [...expectedIds].filter((id) => !foundIds.has(id));

    if (diffIds.length) {
      throw GqlError("Invalid Animes Id", 404, {
        animesId: diffIds,
      });
    }

    return animes.map(convertAnime);
  }

  @Query((returns) => [AnimeGenre])
  async getAnimeGenres(
    @Arg("amount", (type) => Int, { nullable: true }) amount?: number,
    @Arg("hentai", { defaultValue: false }) hentai: boolean = false
  ): Promise<AnimeGenre[]> {
    const loaded = await redisClient.exists("anime:genres");

    if (loaded == 0) {
      await seedAnimeGenres();
      await redisClient.expire("anime:genres", 24 * 60 * 60);
    }

    let genres = (await redisClient.json.get(
      "anime:genres"
    )) as any as AnimeGenre[];

    if (!hentai) {
      genres = genres.filter((genre) => genre.genre != "Hentai");
    }

    return genres.sort((a, b) => b.count - a.count).slice(0, amount);
  }

  @Query((returns) => [AnimeSource])
  async getAnimeSources(
    @Arg("amount", (type) => Int, { nullable: true }) amount?: number
  ): Promise<AnimeSource[]> {
    const loaded = await redisClient.exists("anime:sources");

    if (loaded == 0) {
      await seedAnimeSources();
      await redisClient.expire("anime:sources", 24 * 60 * 60);
    }

    const sources = (await redisClient.json.get(
      "anime:sources"
    )) as any as AnimeSource[];

    return sources.sort((a, b) => b.count - a.count).slice(0, amount);
  }
  @Query((returns) => [AnimeStudio])
  async getAnimeStudios(
    @Arg("amount", (type) => Int, { nullable: true }) amount?: number
  ): Promise<AnimeStudio[]> {
    const loaded = await redisClient.exists("anime:studios");

    if (loaded == 0) {
      await seedAnimeStudios();
      await redisClient.expire("anime:studios", 24 * 60 * 60);
    }

    const studios = (await redisClient.json.get(
      "anime:studios"
    )) as any as AnimeStudio[];

    return studios.sort((a, b) => b.count - a.count).slice(0, amount);
  }

  @Query((returns) => [AnimeTitles])
  async getAllAnimeTitles(): Promise<AnimeTitles[]> {
    const loaded = await redisClient.exists("anime:titles");

    if (loaded == 0) {
      await seedAnimeTitles();
      await redisClient.expire("anime:titles", 24 * 60 * 60);
    }

    const titles = (await redisClient.json.get(
      "anime:titles"
    )) as any as AnimeTitles[];

    return titles;
  }

  @Query((returns) => [RelatedAnime])
  async getRelatedAnime(
    @Arg("animeId", (type) => Int) animeId: number,
    @Arg("excludedAnimeIds", (type) => [Int], { nullable: true })
    excludedAnimeIds?: number[]
  ): Promise<RelatedAnime[]> {
    const { relatedAnime: relatedAnimeRaw } =
      await prisma.anime.findUniqueOrThrow({
        where: {
          id: animeId,
        },
        select: {
          relatedAnime: true,
        },
      });

    const relatedAnimeMap = new Map(
      relatedAnimeRaw.map((related) => [
        Number(related.split(" ")[1]),
        related.split(" ")[0] as AnimeRelationEnum,
      ])
    );

    const filteredRelatedMap = new Map(
      [...relatedAnimeMap.entries()].filter(
        ([animeId, relation]) =>
          ![AnimeRelationEnum.character, AnimeRelationEnum.summary].includes(
            relation
          )
      )
    );

    const relatedAnime = await prisma.anime.findMany({
      where: {
        AND: [
          {
            id: {
              in: [...filteredRelatedMap.keys()],
            },
          },
          {
            id: {
              notIn: excludedAnimeIds,
            },
          },
        ],
        NOT: {
          genres: {
            has: "Hentai",
          },
        },
      },
    });

    // const relationOrder: Record<AnimeRelationEnum, number> = {
    //   sequel: 1,
    //   prequel: 2,
    //   side_story: 3,
    //   parent_story: 4,
    //   spin_off: 5,
    //   alternative_version: 6,
    //   alternative_setting: 7,
    //   other: 8,
    //   full_story: 9,
    //   summary: 10,
    //   character: 11,
    // };

    return relatedAnime
      .map((related) => ({
        id: related.id,
        genres: related.genres,
        mediaType: AnimeMediaTypeEnum[related.mediaType],
        picture: related.picture,
        popularity: related.popularity,
        score: related.score,
        title: related.title,
        relation: relatedAnimeMap.get(related.id)! as AnimeRelationEnum,
      }))
      .sort(
        (a, b) =>
          (a.popularity ?? Number.MAX_SAFE_INTEGER) -
          (b.popularity ?? Number.MAX_SAFE_INTEGER)
      );
  }
}

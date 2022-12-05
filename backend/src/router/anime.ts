import { status } from "@grpc/grpc-js";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import prisma from "../../prisma/client";
import { procedure, router } from "../trpc";
import {
  ZodAnime,
  ZodAnimeMediaType,
  ZodAnimeStatus,
  ZodSeasonEnum,
  ZodTopAnimeMethod,
} from "../types/zod";

export const animeRouter = router({
  getAnimeById: procedure
    .input(z.object({ id: z.number().int().positive() }))
    .output(z.object({ anime: ZodAnime }))
    .query(async ({ input }) => {
      const anime = await prisma.anime.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!anime) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "This anime does not exist!",
        });
      }

      return { anime };
    }),

  listAnimeByTitle: procedure
    .input(
      z.object({
        animeTitles: z.array(z.string()),
        hentai: z.boolean().default(false),
      })
    )
    .output(z.object({ animes: z.array(ZodAnime) }))
    .query(async ({ input }) => {
      const animes = await prisma.anime.findMany({
        where: {
          title: {
            in: input.animeTitles,
          },
          NOT: {
            genres: {
              has: input.hentai ? undefined : "rx",
            },
          },
        },
      });

      return { animes };
    }),

  listAnimeById: procedure
    .input(
      z.object({
        animesId: z.array(z.number().int().positive()),
        hentai: z.boolean().default(false),
      })
    )
    .output(z.object({ animes: z.array(ZodAnime) }))
    .query(async ({ input }) => {
      const animes = await prisma.anime.findMany({
        where: {
          id: {
            in: input.animesId,
          },
          NOT: {
            genres: {
              has: input.hentai ? undefined : "rx",
            },
          },
        },
      });

      return { animes };
    }),

  getAnimeGenres: procedure
    .output(z.object({ genres: z.array(z.string()) }))
    .query(async ({ input }) => {
      const animesGenres = await prisma.anime.findMany({
        select: {
          genres: true,
        },
      });

      const genresSet = new Set<string>();

      animesGenres.forEach((animeGenres) => {
        animeGenres.genres.forEach((genre) => {
          genresSet.add(genre);
        });
      });

      const genresArray = Array.from(genresSet);
      const sortedGenres = genresArray.sort((a, b) => {
        if (a > b) {
          return 1;
        }

        if (a < b) {
          return -1;
        }

        return 0;
      });

      return { genres: sortedGenres };
    }),

  getAnimeBySeason: procedure
    .input(
      z.object({
        season: ZodSeasonEnum,
        year: z.number().int().positive(),
        hentai: z.boolean().default(false),
      })
    )
    .output(z.object({ animes: z.array(ZodAnime) }))
    .query(async ({ input }) => {
      const animes = await prisma.anime.findMany({
        where: {
          releasedSeason: {
            equals: `${input.season}, ${input.year}`,
          },
          NOT: {
            genres: {
              has: input.hentai ? undefined : "rx",
            },
          },
        },
      });

      return { animes };
    }),

  getTopAnime: procedure
    .input(
      z.object({
        method: ZodTopAnimeMethod,
        status: ZodAnimeStatus,
        genre: z.string().nullable(),
        mediaType: ZodAnimeMediaType.nullable(),
        hentai: z.boolean().default(false),
      })
    )
    .output(z.object({ animes: z.array(ZodAnime) }))
    .query(async ({ input }) => {
      const statusParser: Record<typeof input.status, string> = {
        airing: "currently_airing",
        finished: "finished_airing",
      };

      const animes = await prisma.anime.findMany({
        where: {
          status: {
            equals: statusParser[input.status],
          },
          mediaType: {
            equals: input.mediaType ?? undefined,
          },
          AND: {
            genres: {
              has: input.genre ?? undefined,
            },
            NOT: {
              genres: {
                has: input.hentai ? undefined : "rx",
              },
            },
          },
        },
        orderBy: {
          rank: input.method == "rank" ? "asc" : undefined,
          popularity: input.method == "popularity" ? "asc" : undefined,
        },
      });

      return { animes };
    }),
});

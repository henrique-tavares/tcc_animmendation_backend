import { TRPCError } from "@trpc/server";
import _ from "lodash";
import { z } from "zod";
import prisma from "../../prisma/client";
import { procedure, router } from "../trpc";
import { ZodAnime } from "../types/zod";
import recommender from "../infrastructure/grpc/clients/recommender";
import { Client } from "@grpc/grpc-js";

export const recommenderRouter = router({
  getAnimeRecommendations: procedure
    .input(
      z.object({
        animeId: z.number().int().positive(),
        k: z.number().int().positive(),
      })
    )
    .output(
      z.array(
        z.object({
          anime: ZodAnime,
          rank: z.number().int().positive(),
        })
      )
    )
    .query(async ({ input }) => {
      const animeId = await prisma.anime.findUnique({
        where: { id: input.animeId },
        select: {
          id: true,
        },
      });
      if (!animeId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `There are no Anime with the id: ${input.animeId}`,
        });
      }

      try {
        const isTrained = await recommender.isTrained({});

        if (!isTrained || !isTrained.trained) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Recommender isn't trained",
          });
        }
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error in checking Recommender is trained",
        });
      }

      const recommendations = await recommender.getRecommendations({
        animeId: input.animeId,
        k: input.k,
      });

      const recommendationMap = recommendations?.recommendations.map(
        (recommendation) => ({
          [recommendation.recommendedAnimeId]: recommendation.rank,
        })
      );

      if (!recommendationMap) {
        return [];
      }

      const animesId = Array.from(recommendationMap.keys());

      const animes = await prisma.anime.findMany({
        where: {
          id: {
            in: animesId,
          },
        },
      });

      return animes.map((anime) => ({
        anime,
        rank: recommendationMap[anime.id],
      }));
    }),
  getAnimesRecommendations: procedure
    .input(
      z.object({
        animesId: z.array(z.number().int().positive()),
        k: z.number().int().positive(),
      })
    )
    .output(
      z.array(
        z.object({
          anime: ZodAnime,
          rank: z.number().int().positive(),
        })
      )
    )
    .query(async ({ input }) => {
      const animesId = await prisma.anime.findMany({
        where: {
          id: {
            in: input.animesId,
          },
        },
      });

      if (animesId.length != input.animesId.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `There are invalid Anime within input`,
        });
      }

      try {
        const isTrained = await recommender.isTrained({});

        if (!isTrained || !isTrained.trained) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Recommender isn't trained",
          });
        }
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error in checking Recommender is trained",
        });
      }

      const recommendations = await recommender.getGroupRecommendations({
        animeIds: input.animesId,
        k: input.k,
      });
    }),
});

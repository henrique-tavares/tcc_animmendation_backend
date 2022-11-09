import { PrismaClient } from "@prisma/client";

export async function filterAnimeId(prisma: PrismaClient) {
  const res = await prisma.anime.findMany({
    where: {
      OR: [
        {
          score: null,
        },
        {
          type: {
            mode: "insensitive",
            equals: "music",
          },
        },
      ],
    },
    select: {
      malId: true,
    },
  });

  return res.map((e) => e.malId);
}

export async function filterAnimeRatingUser(
  prisma: PrismaClient,
  acitityThreshold: number,
  excludeAnimeIds: number[]
) {
  const res = await prisma.animeRating.groupBy({
    by: ["userId"],
    _count: {
      id: true,
    },
    where: {
      watchingStatus: {
        not: "PLAN_TO_WATCH",
      },
      animeId: {
        notIn: excludeAnimeIds,
      },
    },
    having: {
      id: {
        _count: {
          lt: acitityThreshold,
        },
      },
    },
  });
  return res.map((e) => e.userId);
}

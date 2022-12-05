import { z } from "zod";

export const ZodAnime = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  score: z.number().gte(0).lte(10).nullable(),
  alternativeTitles: z.array(z.string()),
  picture: z.string().nullable(),
  status: z.string().nullable(),
  mediaType: z.string().nullable(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  releasedSeason: z.string().nullable(),
  genres: z.array(z.string()),
  synopsis: z.string().nullable(),
  ageClassification: z.string().nullable(),
  source: z.string().nullable(),
  studios: z.array(z.string()),
  episodes: z.number().int().positive().nullable(),
  rank: z.number().int().positive().nullable(),
  popularity: z.number().int().positive().nullable(),
  nsfw: z.string().nullable(),
  relatedAnime: z.array(z.string()),
});

export const ZodAnimeRating = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  animeId: z.number().int().positive(),
  score: z.number().int().positive(),
});

export const ZodSeasonEnum = z.enum(["winter", "spring", "summer", "fall"]);

export const ZodAgeClassificationEnum = z.enum([
  "g",
  "pg",
  "pg_13",
  "r",
  "r+",
  "rx",
]);

export const ZodTopAnimeMethod = z.enum(["rank", "popularity"]);
export const ZodAnimeStatus = z.enum(["airing", "finished"]);
export const ZodAnimeMediaType = z.enum(["tv", "movie", "ova", "ona"]);

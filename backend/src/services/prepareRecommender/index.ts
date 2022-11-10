import prisma from "../../../prisma/client";

async function makeAnimeDataRecommenderDataset() {
  const res = await prisma.$executeRaw`
    copy (
      select *
      from "Anime"
      where
        score is not null
        and "type" != 'Music'
        and duration not ilike '%sec%'
    )
    to '/datasets/recommender/anime_data/data.csv'
    with (format csv, header)
  `;

  console.log(
    `${res} rows written to file '/datasets/recommender/anime_data/data.csv'`
  );
}

async function makeAnimeRatingRecommenderDataset() {
  const res = await prisma.$executeRaw`
    copy (
      select "userId", "animeId", rating
      from "AnimeRating"
      where
        "watchingStatus" != 'PLAN_TO_WATCH'
        and "animeId" not in (
          select "malId"
          from "Anime"
          where
            score is null
            or "type" = 'Music'
            or duration ilike '%sec%'
        )
        and "userId" not in (
          select "userId"
          from "AnimeRating"
          where
            "watchingStatus" != 'PLAN_TO_WATCH'
            and "animeId" not in (
              select "malId"
              from "Anime"
              where
                score is null
                or "type" = 'Music'
                or duration ilike '%sec%'
            )
          group by "userId"
          having count(*) < 30
        )
    )
    to '/datasets/recommender/anime_rating/data.csv'
    with (format csv, header)
  `;

  console.log(
    `${res} rows written to file '/datasets/recommender/anime_rating/data.csv'`
  );
}

export async function makeRecommenderDataset(dataset: "Anime" | "AnimeRating") {
  const functionProxy = {
    Anime: makeAnimeDataRecommenderDataset,
    AnimeRating: makeAnimeRatingRecommenderDataset,
  };

  await functionProxy[dataset]();
}

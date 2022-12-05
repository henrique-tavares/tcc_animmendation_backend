import prisma from "../../../prisma/client";

async function makeAnimeAggregatedDataset() {
  const res = await prisma.$executeRaw`
    copy (
      select "animeId", array_agg("rating") as ratings, array_agg("userId") as "userIds"
      from "AnimeRating"
      where
        "watchingStatus" != 'PLAN_TO_WATCH'
        and "animeId" not in ( select "malId" from "Anime" where score is null )
        and rating != 0
      group by "animeId"
    )
    to '/datasets/recommender/anime_aggregated.csv'
    with (format csv, header)
  `;

  console.log(
    `${res} rows written to file '/datasets/recommender/anime_aggregated.csv'`
  );
}

export async function makeRecommenderDatasets() {
  await makeAnimeAggregatedDataset();
}

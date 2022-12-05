/*
  Warnings:

  - You are about to drop the `Anime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AnimeRating` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnimeRating" DROP CONSTRAINT "AnimeRating_animeId_fkey";

-- DropTable
DROP TABLE "Anime";

-- DropTable
DROP TABLE "AnimeRating";

-- DropEnum
DROP TYPE "AgeClassification";

-- DropEnum
DROP TYPE "Type";

-- DropEnum
DROP TYPE "WatchingStatus";

-- CreateTable
CREATE TABLE "animes" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "score" DOUBLE PRECISION,
    "alternative_titles" TEXT[],
    "picture" TEXT,
    "status" TEXT,
    "media_type" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "released_season" TEXT NOT NULL,
    "genres" TEXT[],
    "synopsis" TEXT NOT NULL,
    "age_classification" TEXT NOT NULL,
    "source" TEXT,
    "studios" TEXT[],
    "episodes" INTEGER,
    "rank" INTEGER,
    "popularity" INTEGER,
    "nsfw" TEXT,
    "relatedAnime" TEXT[],

    CONSTRAINT "animes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_anime_ratings" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "anime_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "user_anime_ratings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_anime_ratings" ADD CONSTRAINT "user_anime_ratings_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "animes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

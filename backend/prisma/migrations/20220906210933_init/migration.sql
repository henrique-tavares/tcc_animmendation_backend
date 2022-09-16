-- CreateEnum
CREATE TYPE "WatchingStatus" AS ENUM ('UNKNOWN', 'CURRENTLY_WATCHING', 'COMPLETED', 'ON_HOLD', 'DROPPED', 'PLAN_TO_WATCH');

-- CreateTable
CREATE TABLE "Anime" (
    "malId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "japaneseName" TEXT,
    "type" TEXT NOT NULL,
    "episodes" TEXT NOT NULL,
    "broadcastStartDate" TIMESTAMP(3),
    "broadcastEndDate" TIMESTAMP(3),
    "studios" TEXT[],
    "source" TEXT NOT NULL,
    "ageClassification" TEXT NOT NULL,
    "popularity" TEXT NOT NULL,
    "watching" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("malId")
);

-- CreateTable
CREATE TABLE "AnimeRating" (
    "userId" INTEGER NOT NULL,
    "animeId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "watchingStatus" "WatchingStatus" NOT NULL,
    "watchedEpisodes" INTEGER NOT NULL,

    CONSTRAINT "AnimeRating_pkey" PRIMARY KEY ("userId","animeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Anime_name_key" ON "Anime"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Anime_japaneseName_key" ON "Anime"("japaneseName");

-- CreateIndex
CREATE INDEX "Anime_name_japaneseName_idx" ON "Anime"("name", "japaneseName");

-- AddForeignKey
ALTER TABLE "AnimeRating" ADD CONSTRAINT "AnimeRating_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("malId") ON DELETE RESTRICT ON UPDATE CASCADE;

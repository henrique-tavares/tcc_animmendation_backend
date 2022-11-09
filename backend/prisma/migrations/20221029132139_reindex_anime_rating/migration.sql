/*
  Warnings:

  - The primary key for the `AnimeRating` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "AnimeRating" DROP CONSTRAINT "AnimeRating_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "AnimeRating_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "AnimeRating_userId_animeId_idx" ON "AnimeRating"("userId", "animeId");

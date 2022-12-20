/*
  Warnings:

  - You are about to drop the column `relatedAnime` on the `animes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "animes" DROP COLUMN "relatedAnime",
ADD COLUMN     "related_anime" TEXT[];

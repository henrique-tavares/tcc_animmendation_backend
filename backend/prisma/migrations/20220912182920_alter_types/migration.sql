/*
  Warnings:

  - The `popularity` column on the `Anime` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `watching` column on the `Anime` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Anime" ALTER COLUMN "source" DROP NOT NULL,
ALTER COLUMN "ageClassification" DROP NOT NULL,
DROP COLUMN "popularity",
ADD COLUMN     "popularity" INTEGER,
DROP COLUMN "watching",
ADD COLUMN     "watching" INTEGER,
ALTER COLUMN "synopsis" DROP NOT NULL;

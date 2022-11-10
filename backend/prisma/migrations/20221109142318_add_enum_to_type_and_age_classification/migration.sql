/*
  Warnings:

  - The `type` column on the `Anime` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ageClassification` column on the `Anime` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('TV', 'Special', 'ONA', 'Music', 'Movie', 'OVA');

-- CreateEnum
CREATE TYPE "AgeClassification" AS ENUM ('G - All Ages', 'PG - Children', 'PG-13 - Teens 13 or older', 'R - 17+ (violence & profanity)', 'R+ - Mild Nudity', 'Rx - Hentai');

-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "type",
ADD COLUMN     "type" "Type",
DROP COLUMN "ageClassification",
ADD COLUMN     "ageClassification" "AgeClassification";

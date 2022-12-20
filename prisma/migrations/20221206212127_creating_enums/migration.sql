/*
  Warnings:

  - The `age_classification` column on the `animes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `status` on the `animes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `media_type` on the `animes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "anime_age_classification" AS ENUM ('g', 'pg', 'pg_13', 'r', 'r+', 'rx');

-- CreateEnum
CREATE TYPE "anime_media_type" AS ENUM ('tv', 'movie', 'ova', 'ona', 'special');

-- CreateEnum
CREATE TYPE "anime_status" AS ENUM ('currently_airing', 'finished_airing');

-- AlterTable
ALTER TABLE "animes" DROP COLUMN "status",
ADD COLUMN     "status" "anime_status" NOT NULL,
DROP COLUMN "media_type",
ADD COLUMN     "media_type" "anime_media_type" NOT NULL,
DROP COLUMN "age_classification",
ADD COLUMN     "age_classification" "anime_age_classification";

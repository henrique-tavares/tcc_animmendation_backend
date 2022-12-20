/*
  Warnings:

  - The values [UNKNOWN] on the enum `WatchingStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "WatchingStatus_new" AS ENUM ('CURRENTLY_WATCHING', 'COMPLETED', 'ON_HOLD', 'DROPPED', 'PLAN_TO_WATCH');
ALTER TABLE "AnimeRating" ALTER COLUMN "watchingStatus" DROP DEFAULT;
ALTER TABLE "AnimeRating" ALTER COLUMN "watchingStatus" TYPE "WatchingStatus_new" USING ("watchingStatus"::text::"WatchingStatus_new");
ALTER TYPE "WatchingStatus" RENAME TO "WatchingStatus_old";
ALTER TYPE "WatchingStatus_new" RENAME TO "WatchingStatus";
DROP TYPE "WatchingStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "AnimeRating" ALTER COLUMN "watchingStatus" DROP NOT NULL,
ALTER COLUMN "watchingStatus" DROP DEFAULT;

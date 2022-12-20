/*
  Warnings:

  - The values [user_anime_ratings] on the enum `models` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `user_anime_ratings` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "models_new" AS ENUM ('anime');
ALTER TABLE "seed_tracking" ALTER COLUMN "model" TYPE "models_new" USING ("model"::text::"models_new");
ALTER TYPE "models" RENAME TO "models_old";
ALTER TYPE "models_new" RENAME TO "models";
DROP TYPE "models_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "user_anime_ratings" DROP CONSTRAINT "user_anime_ratings_anime_id_fkey";

-- DropTable
DROP TABLE "user_anime_ratings";

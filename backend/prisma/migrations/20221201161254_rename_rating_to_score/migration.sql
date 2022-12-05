/*
  Warnings:

  - You are about to drop the column `rating` on the `user_anime_ratings` table. All the data in the column will be lost.
  - Added the required column `score` to the `user_anime_ratings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_anime_ratings" DROP COLUMN "rating",
ADD COLUMN     "score" INTEGER NOT NULL;

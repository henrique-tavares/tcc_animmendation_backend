/*
  Warnings:

  - Made the column `score` on table `animes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "animes" ALTER COLUMN "score" SET NOT NULL;

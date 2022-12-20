/*
  Warnings:

  - Made the column `status` on table `animes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `media_type` on table `animes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "animes" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "media_type" SET NOT NULL;

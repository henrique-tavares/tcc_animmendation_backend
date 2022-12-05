-- AlterTable
ALTER TABLE "animes" ALTER COLUMN "released_season" DROP NOT NULL,
ALTER COLUMN "synopsis" DROP NOT NULL,
ALTER COLUMN "age_classification" DROP NOT NULL;

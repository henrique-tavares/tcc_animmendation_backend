-- CreateEnum
CREATE TYPE "models" AS ENUM ('anime', 'user_anime_ratings');

-- CreateTable
CREATE TABLE "seed_tracking" (
    "model" "models" NOT NULL,
    "last_seeded" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seed_tracking_pkey" PRIMARY KEY ("model")
);

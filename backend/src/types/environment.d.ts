export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATASET_RAW_ANIME: string;
      DATASET_RAW_ANIME_WITH_SYNOPSIS: string;
      DATASET_TREATED_ANIME_COMPLETE: string;
    }
  }
}

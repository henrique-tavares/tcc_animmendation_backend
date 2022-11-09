export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST?: string;
      DB_NAME?: string;
      DB_USERNAME?: string;
      DB_PASSWORD?: string;
      DB_PORT?: string;
      // MS_DATASET_HANDLER?: string;
      MS_RECOMMENDATION?: string;
      SEED_ANIME?: string;
      SEED_ANIME_RATING?: string;
      // SEED_BULK_BATCH_SIZE?: string;
    }
  }
}

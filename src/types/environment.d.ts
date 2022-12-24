export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV?: string;
      API_PORT?: string;
      DB_HOST?: string;
      DB_NAME?: string;
      DB_USERNAME?: string;
      DB_PASSWORD?: string;
      DB_PORT?: string;
      REDIS_URL?: string;
      SFTP_HOST?: string;
      SFTP_PORT?: string;
      SFTP_USERNAME?: string;
      SFTP_PASSWORD?: string;
      SFTP_ANIMES_PATH?: string;
      SFTP_USER_ANIME_RATINGS_PATH?: string;
      MS_RECOMMENDATION?: string;
      MAL_CLIENT_ID?: string;
      MAL_CLIENT_SECRET?: string;
      MAL_CODE_CHALLENGE?: string;
      MAL_CALLBACK_URL?: string;
    }
  }
}

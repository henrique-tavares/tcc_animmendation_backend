export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST?: string;
      DB_NAME?: string;
      DB_USERNAME?: string;
      DB_PASSWORD?: string;
      DB_PORT?: string;
      SFTP_HOST?: string;
      SFTP_PORT?: string;
      SFTP_USERNAME?: string;
      SFTP_PASSWORD?: string;
      SFTP_ANIMES_PATH?: string;
      SFTP_USER_ANIME_RATINGS_PATH?: string;
      MS_RECOMMENDATION?: string;
    }
  }
}

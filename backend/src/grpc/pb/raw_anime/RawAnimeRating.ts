// Original file: src/grpc/protos/raw_anime.proto

import type { WatchingStatus as _raw_anime_WatchingStatus } from '../raw_anime/WatchingStatus';

export interface RawAnimeRating {
  'animeId'?: (number);
  'userId'?: (number);
  'rating'?: (number);
  'watchingStatus'?: (_raw_anime_WatchingStatus | keyof typeof _raw_anime_WatchingStatus);
  'watchedEpisodes'?: (number);
  '_watchingStatus'?: "watchingStatus";
  '_watchedEpisodes'?: "watchedEpisodes";
}

export interface RawAnimeRating__Output {
  'animeId': (number);
  'userId': (number);
  'rating': (number);
  'watchingStatus'?: (keyof typeof _raw_anime_WatchingStatus);
  'watchedEpisodes'?: (number);
}

// Original file: src/grpc/protos/anime.proto

import type { WatchingStatus as _anime_WatchingStatus } from '../anime/WatchingStatus';

export interface AnimeRating {
  'userId'?: (number);
  'animeId'?: (number);
  'rating'?: (number);
  'watchingStatus'?: (_anime_WatchingStatus | keyof typeof _anime_WatchingStatus);
}

export interface AnimeRating__Output {
  'userId': (number);
  'animeId': (number);
  'rating': (number);
  'watchingStatus': (keyof typeof _anime_WatchingStatus);
}

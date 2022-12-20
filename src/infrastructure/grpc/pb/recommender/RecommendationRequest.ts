// Original file: src/infrastructure/grpc/protos/recommender.proto


export interface RecommendationRequest {
  'animeId'?: (number);
  'k'?: (number);
  'excludedAnimeIds'?: (number)[];
  '_k'?: "k";
}

export interface RecommendationRequest__Output {
  'animeId': (number);
  'k'?: (number);
  'excludedAnimeIds': (number)[];
}

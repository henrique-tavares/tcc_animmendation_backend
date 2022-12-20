// Original file: src/infrastructure/grpc/protos/recommender.proto


export interface GroupRecommendationRequest {
  'animeIds'?: (number)[];
  'k'?: (number);
  'excludedAnimeIds'?: (number)[];
  '_k'?: "k";
}

export interface GroupRecommendationRequest__Output {
  'animeIds': (number)[];
  'k'?: (number);
  'excludedAnimeIds': (number)[];
}

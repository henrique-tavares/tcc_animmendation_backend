// Original file: src/infrastructure/grpc/protos/recommender.proto


export interface GroupRecommendationRequest {
  'animeIds'?: (number)[];
  'amount'?: (number);
  'offset'?: (number);
  'excludedAnimeIds'?: (number)[];
  '_amount'?: "amount";
  '_offset'?: "offset";
}

export interface GroupRecommendationRequest__Output {
  'animeIds': (number)[];
  'amount'?: (number);
  'offset'?: (number);
  'excludedAnimeIds': (number)[];
}

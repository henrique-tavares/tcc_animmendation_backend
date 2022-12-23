// Original file: src/infrastructure/grpc/protos/recommender.proto


export interface RecommendationRequest {
  'animeId'?: (number);
  'amount'?: (number);
  'offset'?: (number);
  'excludedAnimeIds'?: (number)[];
  '_amount'?: "amount";
  '_offset'?: "offset";
}

export interface RecommendationRequest__Output {
  'animeId': (number);
  'amount'?: (number);
  'offset'?: (number);
  'excludedAnimeIds': (number)[];
}

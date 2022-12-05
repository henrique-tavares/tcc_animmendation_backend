// Original file: src/infrastructure/grpc/protos/recommender.proto


export interface BatchedRecommendationRequest {
  'animeIds'?: (number)[];
  'k'?: (number);
}

export interface BatchedRecommendationRequest__Output {
  'animeIds': (number)[];
  'k': (number);
}

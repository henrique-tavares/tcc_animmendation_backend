// Original file: src/infrastructure/grpc/protos/recommender.proto


export interface _recommender_RecommendationResponse_Recommendation {
  'recommendedAnimeId'?: (number);
  'rank'?: (number);
}

export interface _recommender_RecommendationResponse_Recommendation__Output {
  'recommendedAnimeId': (number);
  'rank': (number);
}

export interface RecommendationResponse {
  'animeId'?: (number);
  'recommendations'?: (_recommender_RecommendationResponse_Recommendation)[];
}

export interface RecommendationResponse__Output {
  'animeId': (number);
  'recommendations': (_recommender_RecommendationResponse_Recommendation__Output)[];
}

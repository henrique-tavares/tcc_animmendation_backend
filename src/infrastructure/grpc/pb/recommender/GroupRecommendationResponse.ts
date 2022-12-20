// Original file: src/infrastructure/grpc/protos/recommender.proto

import type { Recommendation as _recommender_Recommendation, Recommendation__Output as _recommender_Recommendation__Output } from '../recommender/Recommendation';

export interface GroupRecommendationResponse {
  'recommendations'?: (_recommender_Recommendation)[];
}

export interface GroupRecommendationResponse__Output {
  'recommendations': (_recommender_Recommendation__Output)[];
}

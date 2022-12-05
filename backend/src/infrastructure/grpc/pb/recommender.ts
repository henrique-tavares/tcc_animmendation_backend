import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { RecommenderClient as _recommender_RecommenderClient, RecommenderDefinition as _recommender_RecommenderDefinition } from './recommender/Recommender';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  recommender: {
    Empty: MessageTypeDefinition
    GroupRecommendationRequest: MessageTypeDefinition
    GroupRecommendationResponse: MessageTypeDefinition
    IsTrainedResponse: MessageTypeDefinition
    RecommendationRequest: MessageTypeDefinition
    RecommendationResponse: MessageTypeDefinition
    Recommender: SubtypeConstructor<typeof grpc.Client, _recommender_RecommenderClient> & { service: _recommender_RecommenderDefinition }
  }
}


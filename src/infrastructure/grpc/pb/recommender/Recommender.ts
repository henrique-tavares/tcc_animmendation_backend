// Original file: src/infrastructure/grpc/protos/recommender.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _recommender_Empty, Empty__Output as _recommender_Empty__Output } from '../recommender/Empty';
import type { GroupRecommendationRequest as _recommender_GroupRecommendationRequest, GroupRecommendationRequest__Output as _recommender_GroupRecommendationRequest__Output } from '../recommender/GroupRecommendationRequest';
import type { GroupRecommendationResponse as _recommender_GroupRecommendationResponse, GroupRecommendationResponse__Output as _recommender_GroupRecommendationResponse__Output } from '../recommender/GroupRecommendationResponse';
import type { IsTrainedResponse as _recommender_IsTrainedResponse, IsTrainedResponse__Output as _recommender_IsTrainedResponse__Output } from '../recommender/IsTrainedResponse';
import type { RecommendationRequest as _recommender_RecommendationRequest, RecommendationRequest__Output as _recommender_RecommendationRequest__Output } from '../recommender/RecommendationRequest';
import type { RecommendationResponse as _recommender_RecommendationResponse, RecommendationResponse__Output as _recommender_RecommendationResponse__Output } from '../recommender/RecommendationResponse';

export interface RecommenderClient extends grpc.Client {
  GetGroupRecommendations(argument: _recommender_GroupRecommendationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_recommender_GroupRecommendationResponse__Output>): grpc.ClientUnaryCall;
  GetGroupRecommendations(argument: _recommender_GroupRecommendationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_recommender_GroupRecommendationResponse__Output>): grpc.ClientUnaryCall;
  GetGroupRecommendations(argument: _recommender_GroupRecommendationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_recommender_GroupRecommendationResponse__Output>): grpc.ClientUnaryCall;
  GetGroupRecommendations(argument: _recommender_GroupRecommendationRequest, callback: grpc.requestCallback<_recommender_GroupRecommendationResponse__Output>): grpc.ClientUnaryCall;
  getGroupRecommendations(argument: _recommender_GroupRecommendationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_recommender_GroupRecommendationResponse__Output>): grpc.ClientUnaryCall;
  getGroupRecommendations(argument: _recommender_GroupRecommendationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_recommender_GroupRecommendationResponse__Output>): grpc.ClientUnaryCall;
  getGroupRecommendations(argument: _recommender_GroupRecommendationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_recommender_GroupRecommendationResponse__Output>): grpc.ClientUnaryCall;
  getGroupRecommendations(argument: _recommender_GroupRecommendationRequest, callback: grpc.requestCallback<_recommender_GroupRecommendationResponse__Output>): grpc.ClientUnaryCall;
  
  GetRecommendations(argument: _recommender_RecommendationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_recommender_RecommendationResponse__Output>): grpc.ClientUnaryCall;
  GetRecommendations(argument: _recommender_RecommendationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_recommender_RecommendationResponse__Output>): grpc.ClientUnaryCall;
  GetRecommendations(argument: _recommender_RecommendationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_recommender_RecommendationResponse__Output>): grpc.ClientUnaryCall;
  GetRecommendations(argument: _recommender_RecommendationRequest, callback: grpc.requestCallback<_recommender_RecommendationResponse__Output>): grpc.ClientUnaryCall;
  getRecommendations(argument: _recommender_RecommendationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_recommender_RecommendationResponse__Output>): grpc.ClientUnaryCall;
  getRecommendations(argument: _recommender_RecommendationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_recommender_RecommendationResponse__Output>): grpc.ClientUnaryCall;
  getRecommendations(argument: _recommender_RecommendationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_recommender_RecommendationResponse__Output>): grpc.ClientUnaryCall;
  getRecommendations(argument: _recommender_RecommendationRequest, callback: grpc.requestCallback<_recommender_RecommendationResponse__Output>): grpc.ClientUnaryCall;
  
  IsTrained(argument: _recommender_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_recommender_IsTrainedResponse__Output>): grpc.ClientUnaryCall;
  IsTrained(argument: _recommender_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_recommender_IsTrainedResponse__Output>): grpc.ClientUnaryCall;
  IsTrained(argument: _recommender_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_recommender_IsTrainedResponse__Output>): grpc.ClientUnaryCall;
  IsTrained(argument: _recommender_Empty, callback: grpc.requestCallback<_recommender_IsTrainedResponse__Output>): grpc.ClientUnaryCall;
  isTrained(argument: _recommender_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_recommender_IsTrainedResponse__Output>): grpc.ClientUnaryCall;
  isTrained(argument: _recommender_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_recommender_IsTrainedResponse__Output>): grpc.ClientUnaryCall;
  isTrained(argument: _recommender_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_recommender_IsTrainedResponse__Output>): grpc.ClientUnaryCall;
  isTrained(argument: _recommender_Empty, callback: grpc.requestCallback<_recommender_IsTrainedResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface RecommenderHandlers extends grpc.UntypedServiceImplementation {
  GetGroupRecommendations: grpc.handleUnaryCall<_recommender_GroupRecommendationRequest__Output, _recommender_GroupRecommendationResponse>;
  
  GetRecommendations: grpc.handleUnaryCall<_recommender_RecommendationRequest__Output, _recommender_RecommendationResponse>;
  
  IsTrained: grpc.handleUnaryCall<_recommender_Empty__Output, _recommender_IsTrainedResponse>;
  
}

export interface RecommenderDefinition extends grpc.ServiceDefinition {
  GetGroupRecommendations: MethodDefinition<_recommender_GroupRecommendationRequest, _recommender_GroupRecommendationResponse, _recommender_GroupRecommendationRequest__Output, _recommender_GroupRecommendationResponse__Output>
  GetRecommendations: MethodDefinition<_recommender_RecommendationRequest, _recommender_RecommendationResponse, _recommender_RecommendationRequest__Output, _recommender_RecommendationResponse__Output>
  IsTrained: MethodDefinition<_recommender_Empty, _recommender_IsTrainedResponse, _recommender_Empty__Output, _recommender_IsTrainedResponse__Output>
}

// Original file: src/grpc/protos/raw_anime.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { RawAnime as _raw_anime_RawAnime, RawAnime__Output as _raw_anime_RawAnime__Output } from '../raw_anime/RawAnime';
import type { RawAnimeRating as _raw_anime_RawAnimeRating, RawAnimeRating__Output as _raw_anime_RawAnimeRating__Output } from '../raw_anime/RawAnimeRating';
import type { RawAnimeSynopsis as _raw_anime_RawAnimeSynopsis, RawAnimeSynopsis__Output as _raw_anime_RawAnimeSynopsis__Output } from '../raw_anime/RawAnimeSynopsis';
import type { Void as _raw_anime_Void, Void__Output as _raw_anime_Void__Output } from '../raw_anime/Void';

export interface RawAnimeServiceClient extends grpc.Client {
  FetchRawAnimeRatings(argument: _raw_anime_Void, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_raw_anime_RawAnimeRating__Output>;
  FetchRawAnimeRatings(argument: _raw_anime_Void, options?: grpc.CallOptions): grpc.ClientReadableStream<_raw_anime_RawAnimeRating__Output>;
  fetchRawAnimeRatings(argument: _raw_anime_Void, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_raw_anime_RawAnimeRating__Output>;
  fetchRawAnimeRatings(argument: _raw_anime_Void, options?: grpc.CallOptions): grpc.ClientReadableStream<_raw_anime_RawAnimeRating__Output>;
  
  FetchRawAnimes(argument: _raw_anime_Void, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_raw_anime_RawAnime__Output>;
  FetchRawAnimes(argument: _raw_anime_Void, options?: grpc.CallOptions): grpc.ClientReadableStream<_raw_anime_RawAnime__Output>;
  fetchRawAnimes(argument: _raw_anime_Void, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_raw_anime_RawAnime__Output>;
  fetchRawAnimes(argument: _raw_anime_Void, options?: grpc.CallOptions): grpc.ClientReadableStream<_raw_anime_RawAnime__Output>;
  
  FetchRawAnimesSynopsis(argument: _raw_anime_Void, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_raw_anime_RawAnimeSynopsis__Output>;
  FetchRawAnimesSynopsis(argument: _raw_anime_Void, options?: grpc.CallOptions): grpc.ClientReadableStream<_raw_anime_RawAnimeSynopsis__Output>;
  fetchRawAnimesSynopsis(argument: _raw_anime_Void, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_raw_anime_RawAnimeSynopsis__Output>;
  fetchRawAnimesSynopsis(argument: _raw_anime_Void, options?: grpc.CallOptions): grpc.ClientReadableStream<_raw_anime_RawAnimeSynopsis__Output>;
  
}

export interface RawAnimeServiceHandlers extends grpc.UntypedServiceImplementation {
  FetchRawAnimeRatings: grpc.handleServerStreamingCall<_raw_anime_Void__Output, _raw_anime_RawAnimeRating>;
  
  FetchRawAnimes: grpc.handleServerStreamingCall<_raw_anime_Void__Output, _raw_anime_RawAnime>;
  
  FetchRawAnimesSynopsis: grpc.handleServerStreamingCall<_raw_anime_Void__Output, _raw_anime_RawAnimeSynopsis>;
  
}

export interface RawAnimeServiceDefinition extends grpc.ServiceDefinition {
  FetchRawAnimeRatings: MethodDefinition<_raw_anime_Void, _raw_anime_RawAnimeRating, _raw_anime_Void__Output, _raw_anime_RawAnimeRating__Output>
  FetchRawAnimes: MethodDefinition<_raw_anime_Void, _raw_anime_RawAnime, _raw_anime_Void__Output, _raw_anime_RawAnime__Output>
  FetchRawAnimesSynopsis: MethodDefinition<_raw_anime_Void, _raw_anime_RawAnimeSynopsis, _raw_anime_Void__Output, _raw_anime_RawAnimeSynopsis__Output>
}

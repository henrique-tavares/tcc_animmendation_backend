// Original file: src/grpc/protos/anime.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Anime as _anime_Anime, Anime__Output as _anime_Anime__Output } from '../anime/Anime';
import type { AnimeRating as _anime_AnimeRating, AnimeRating__Output as _anime_AnimeRating__Output } from '../anime/AnimeRating';
import type { Void as _anime_Void, Void__Output as _anime_Void__Output } from '../anime/Void';

export interface AnimeServiceClient extends grpc.Client {
  FetchAnime(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_anime_Void__Output>): grpc.ClientWritableStream<_anime_Anime>;
  FetchAnime(metadata: grpc.Metadata, callback: grpc.requestCallback<_anime_Void__Output>): grpc.ClientWritableStream<_anime_Anime>;
  FetchAnime(options: grpc.CallOptions, callback: grpc.requestCallback<_anime_Void__Output>): grpc.ClientWritableStream<_anime_Anime>;
  FetchAnime(callback: grpc.requestCallback<_anime_Void__Output>): grpc.ClientWritableStream<_anime_Anime>;
  fetchAnime(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_anime_Void__Output>): grpc.ClientWritableStream<_anime_Anime>;
  fetchAnime(metadata: grpc.Metadata, callback: grpc.requestCallback<_anime_Void__Output>): grpc.ClientWritableStream<_anime_Anime>;
  fetchAnime(options: grpc.CallOptions, callback: grpc.requestCallback<_anime_Void__Output>): grpc.ClientWritableStream<_anime_Anime>;
  fetchAnime(callback: grpc.requestCallback<_anime_Void__Output>): grpc.ClientWritableStream<_anime_Anime>;
  
  FetchAnimeRating(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_anime_Void__Output>): grpc.ClientWritableStream<_anime_AnimeRating>;
  FetchAnimeRating(metadata: grpc.Metadata, callback: grpc.requestCallback<_anime_Void__Output>): grpc.ClientWritableStream<_anime_AnimeRating>;
  FetchAnimeRating(options: grpc.CallOptions, callback: grpc.requestCallback<_anime_Void__Output>): grpc.ClientWritableStream<_anime_AnimeRating>;
  FetchAnimeRating(callback: grpc.requestCallback<_anime_Void__Output>): grpc.ClientWritableStream<_anime_AnimeRating>;
  fetchAnimeRating(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_anime_Void__Output>): grpc.ClientWritableStream<_anime_AnimeRating>;
  fetchAnimeRating(metadata: grpc.Metadata, callback: grpc.requestCallback<_anime_Void__Output>): grpc.ClientWritableStream<_anime_AnimeRating>;
  fetchAnimeRating(options: grpc.CallOptions, callback: grpc.requestCallback<_anime_Void__Output>): grpc.ClientWritableStream<_anime_AnimeRating>;
  fetchAnimeRating(callback: grpc.requestCallback<_anime_Void__Output>): grpc.ClientWritableStream<_anime_AnimeRating>;
  
}

export interface AnimeServiceHandlers extends grpc.UntypedServiceImplementation {
  FetchAnime: grpc.handleClientStreamingCall<_anime_Anime__Output, _anime_Void>;
  
  FetchAnimeRating: grpc.handleClientStreamingCall<_anime_AnimeRating__Output, _anime_Void>;
  
}

export interface AnimeServiceDefinition extends grpc.ServiceDefinition {
  FetchAnime: MethodDefinition<_anime_Anime, _anime_Void, _anime_Anime__Output, _anime_Void__Output>
  FetchAnimeRating: MethodDefinition<_anime_AnimeRating, _anime_Void, _anime_AnimeRating__Output, _anime_Void__Output>
}

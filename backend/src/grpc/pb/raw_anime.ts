import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { RawAnimeServiceClient as _raw_anime_RawAnimeServiceClient, RawAnimeServiceDefinition as _raw_anime_RawAnimeServiceDefinition } from './raw_anime/RawAnimeService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  raw_anime: {
    RawAnime: MessageTypeDefinition
    RawAnimeRating: MessageTypeDefinition
    RawAnimeService: SubtypeConstructor<typeof grpc.Client, _raw_anime_RawAnimeServiceClient> & { service: _raw_anime_RawAnimeServiceDefinition }
    RawAnimeSynopsis: MessageTypeDefinition
    Void: MessageTypeDefinition
    WatchingStatus: EnumTypeDefinition
  }
}


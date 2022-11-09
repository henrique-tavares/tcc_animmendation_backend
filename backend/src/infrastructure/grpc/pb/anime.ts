import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AnimeServiceClient as _anime_AnimeServiceClient, AnimeServiceDefinition as _anime_AnimeServiceDefinition } from './anime/AnimeService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  anime: {
    Anime: MessageTypeDefinition
    AnimeRating: MessageTypeDefinition
    AnimeService: SubtypeConstructor<typeof grpc.Client, _anime_AnimeServiceClient> & { service: _anime_AnimeServiceDefinition }
    Ok: MessageTypeDefinition
    Void: MessageTypeDefinition
  }
}


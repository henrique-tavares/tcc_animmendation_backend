import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ShutdownServiceClient as _shutdown_ShutdownServiceClient, ShutdownServiceDefinition as _shutdown_ShutdownServiceDefinition } from './shutdown/ShutdownService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  shutdown: {
    ShutdownService: SubtypeConstructor<typeof grpc.Client, _shutdown_ShutdownServiceClient> & { service: _shutdown_ShutdownServiceDefinition }
    Void: MessageTypeDefinition
  }
}


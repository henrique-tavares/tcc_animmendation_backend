// Original file: src/grpc/protos/shutdown.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Void as _shutdown_Void, Void__Output as _shutdown_Void__Output } from '../shutdown/Void';

export interface ShutdownServiceClient extends grpc.Client {
  Shutdown(argument: _shutdown_Void, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_shutdown_Void__Output>): grpc.ClientUnaryCall;
  Shutdown(argument: _shutdown_Void, metadata: grpc.Metadata, callback: grpc.requestCallback<_shutdown_Void__Output>): grpc.ClientUnaryCall;
  Shutdown(argument: _shutdown_Void, options: grpc.CallOptions, callback: grpc.requestCallback<_shutdown_Void__Output>): grpc.ClientUnaryCall;
  Shutdown(argument: _shutdown_Void, callback: grpc.requestCallback<_shutdown_Void__Output>): grpc.ClientUnaryCall;
  shutdown(argument: _shutdown_Void, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_shutdown_Void__Output>): grpc.ClientUnaryCall;
  shutdown(argument: _shutdown_Void, metadata: grpc.Metadata, callback: grpc.requestCallback<_shutdown_Void__Output>): grpc.ClientUnaryCall;
  shutdown(argument: _shutdown_Void, options: grpc.CallOptions, callback: grpc.requestCallback<_shutdown_Void__Output>): grpc.ClientUnaryCall;
  shutdown(argument: _shutdown_Void, callback: grpc.requestCallback<_shutdown_Void__Output>): grpc.ClientUnaryCall;
  
}

export interface ShutdownServiceHandlers extends grpc.UntypedServiceImplementation {
  Shutdown: grpc.handleUnaryCall<_shutdown_Void__Output, _shutdown_Void>;
  
}

export interface ShutdownServiceDefinition extends grpc.ServiceDefinition {
  Shutdown: MethodDefinition<_shutdown_Void, _shutdown_Void, _shutdown_Void__Output, _shutdown_Void__Output>
}

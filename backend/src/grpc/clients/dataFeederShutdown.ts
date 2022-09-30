import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import type { ProtoGrpcType as ShutdownGrpcType } from "../pb/shutdown";

const packageDefinition = protoLoader.loadSync("../protos/shutdown.proto", {
  longs: String,
  enums: String,
  defaults: true,
});

const protoDescriptor = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ShutdownGrpcType;

const client = new protoDescriptor.shutdown.ShutdownService(
  process.env.MS_DATA_FEEDER,
  grpc.credentials.createInsecure()
);

export default client;

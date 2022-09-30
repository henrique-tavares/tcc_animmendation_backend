import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { ProtoGrpcType as RawAnimeGrpcType } from "../pb/raw_anime";

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "../protos/raw_anime.proto"),
  {
    longs: String,
    enums: String,
    defaults: true,
  }
);

const protoDescriptor = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as RawAnimeGrpcType;

const client = new protoDescriptor.raw_anime.RawAnimeService(
  process.env.MS_DATA_FEEDER as string,
  grpc.credentials.createInsecure()
);

export default client;

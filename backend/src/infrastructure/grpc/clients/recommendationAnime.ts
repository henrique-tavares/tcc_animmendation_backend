import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import type { ProtoGrpcType as AnimeGrpcType } from "../pb/anime";

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "../protos/anime.proto"),
  {
    longs: String,
    enums: String,
    defaults: true,
  }
);

const protoDescriptor = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as AnimeGrpcType;

const client = new protoDescriptor.anime.AnimeService(
  process.env.MS_RECOMMENDATION ?? "",
  grpc.credentials.createInsecure()
);

export default client;

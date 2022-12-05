import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import type { ProtoGrpcType as Recommender } from "../pb/recommender";
import { Empty } from "../pb/recommender/Empty";
import { GroupRecommendationRequest } from "../pb/recommender/GroupRecommendationRequest";
import { GroupRecommendationResponse__Output } from "../pb/recommender/GroupRecommendationResponse";
import { IsTrainedResponse } from "../pb/recommender/IsTrainedResponse";
import { RecommendationRequest } from "../pb/recommender/RecommendationRequest";
import {
  RecommendationResponse,
  RecommendationResponse__Output,
} from "../pb/recommender/RecommendationResponse";

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "../protos/recommender.proto"),
  {
    longs: String,
    enums: String,
    defaults: true,
  }
);

const protoDescriptor = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as Recommender;

const client = new protoDescriptor.recommender.Recommender(
  process.env.MS_RECOMMENDATION ?? "",
  grpc.credentials.createInsecure()
);

export default {
  async isTrained(argument: Empty) {
    return new Promise<IsTrainedResponse | undefined>((resolve, reject) => {
      client.isTrained(argument, (err, response) => {
        if (err) {
          reject(err);
        }

        resolve(response);
      });
    });
  },

  async getRecommendations(argument: RecommendationRequest) {
    return new Promise<RecommendationResponse__Output | undefined>(
      (resolve, reject) => {
        client.getRecommendations(argument, (err, response) => {
          if (err) {
            reject(err);
          }

          resolve(response);
        });
      }
    );
  },

  async getGroupRecommendations(argument: GroupRecommendationRequest) {
    return new Promise<GroupRecommendationResponse__Output | undefined>(
      (resolve, reject) => {
        client.getGroupRecommendations(argument, (err, response) => {
          if (err) {
            reject(err);
          }

          resolve(response);
        });
      }
    );
  },
};

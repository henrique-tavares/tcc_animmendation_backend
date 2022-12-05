// Original file: src/infrastructure/grpc/protos/recommender.proto


export interface TrainRequest {
  'filePath'?: (string);
  'totalUsers'?: (number);
  'totalAnime'?: (number);
  'forceRetrain'?: (boolean);
  '_forceRetrain'?: "forceRetrain";
}

export interface TrainRequest__Output {
  'filePath': (string);
  'totalUsers': (number);
  'totalAnime': (number);
  'forceRetrain'?: (boolean);
}

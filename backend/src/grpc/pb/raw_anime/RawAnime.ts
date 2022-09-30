// Original file: src/grpc/protos/raw_anime.proto


export interface RawAnime {
  'malId'?: (number);
  'name'?: (string);
  'score'?: (number | string);
  'genres'?: (string);
  'japaneseName'?: (string);
  'type'?: (string);
  'episodes'?: (number);
  'aired'?: (string);
  'studios'?: (string);
  'source'?: (string);
  'rating'?: (string);
  'popularity'?: (number);
  'watching'?: (number);
  '_score'?: "score";
  '_genres'?: "genres";
  '_japaneseName'?: "japaneseName";
  '_type'?: "type";
  '_episodes'?: "episodes";
  '_aired'?: "aired";
  '_studios'?: "studios";
  '_source'?: "source";
  '_rating'?: "rating";
  '_popularity'?: "popularity";
  '_watching'?: "watching";
}

export interface RawAnime__Output {
  'malId': (number);
  'name': (string);
  'score'?: (number);
  'genres'?: (string);
  'japaneseName'?: (string);
  'type'?: (string);
  'episodes'?: (number);
  'aired'?: (string);
  'studios'?: (string);
  'source'?: (string);
  'rating'?: (string);
  'popularity'?: (number);
  'watching'?: (number);
}

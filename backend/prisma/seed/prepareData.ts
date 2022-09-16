import * as dataForge from "data-forge";
import "data-forge-fs";
import path from "path";

export default {
  async execute() {
    const animeCsvPromise = dataForge
      .readFile(path.resolve(__dirname, "../../datasets/raw/anime.csv"))
      .parseCSV();
    const animeWithSynopsisCsvPromise = dataForge
      .readFile(
        path.resolve(__dirname, "../../datasets/raw/anime_with_synopsis.csv")
      )
      .parseCSV();

    const [animeDf, animeWithSynopsisDf] = await Promise.all([
      animeCsvPromise,
      animeWithSynopsisCsvPromise,
    ]);

    const animeFullWithSynopsisDf = animeDf.joinOuterLeft(
      animeWithSynopsisDf,
      (left) => left.MAL_ID,
      (right) => right.MAL_ID,
      (left, right) => ({
        MalId: left.MAL_ID,
        Name: left.Name,
        Score: left.Score,
        Genres: left.Genres,
        JapaneseName: left["Japanese name"],
        Type: left.Type,
        Episodes: left.Episodes,
        Aired: left.Aired,
        Studios: left.Studios,
        Source: left.Source,
        Rating: left.Rating,
        Popularity: left.Popularity,
        Watching: left.Watching,
        Synopsis: right?.sypnopsis ?? "Unknown",
      })
    );
    await animeFullWithSynopsisDf
      .parseInts("MalId")
      .orderBy((row) => row.MalId)
      .asCSV()
      .writeFile(
        path.resolve(__dirname, "../../datasets/treated/anime_complete.csv")
      );
  },
};

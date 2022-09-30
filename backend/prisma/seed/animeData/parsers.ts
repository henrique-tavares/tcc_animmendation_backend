import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { RawAnime__Output } from "../../../src/grpc/pb/raw_anime/RawAnime";
import { RawAnimeSynopsis__Output } from "../../../src/grpc/pb/raw_anime/RawAnimeSynopsis";

dayjs.extend(customParseFormat);
dayjs.locale("pt-br");

export function parseAnimeData(date: string) {
  const dateParsers = [
    (date: string) => dayjs(date, "MMM D, YYYY"),
    (date: string) => dayjs(date, "MMM, YYYY"),
    (date: string) => dayjs(date, "YYYY"),
  ];

  for (const parser of dateParsers) {
    const parsedDate = parser(date);

    if (parsedDate.isValid()) {
      return parsedDate;
    }
  }

  return null;
}

export function parseIntegerConversion(maybeNumber: string) {
  const convertedNum = Number(maybeNumber);
  return isNaN(convertedNum) || convertedNum == 0 ? null : convertedNum;
}

export function parseSynopsis(synopsis: string) {
  const parsedSynopsis = synopsis.replaceAll('"', "");
  const missingLine =
    "No synopsis information has been added to this title. Help improve our database by adding a synopsis here .";

  return parsedSynopsis == missingLine ? null : parsedSynopsis;
}

export function parseUnknown(data: string) {
  return data == "Unknown" ? null : data;
}

export function parseRawAnime(
  rawAnime: RawAnime__Output
): Prisma.AnimeCreateInput {
  const [startDate = "", endDate = ""] = rawAnime.aired?.split(" to ") ?? [];

  const parsedStartDate = parseAnimeData(startDate);
  const parsedEndDate = parseAnimeData(endDate);

  const releaseDate =
    parsedStartDate && !parsedEndDate ? parsedStartDate : undefined;

  return {
    malId: rawAnime.malId,
    name: rawAnime.name,
    score: rawAnime.score ? Number(rawAnime.score?.toFixed(2)) : undefined,
    genres: rawAnime.genres?.split(", "),
    japaneseName: rawAnime.japaneseName,
    type: rawAnime.type,
    episodes: rawAnime.episodes,
    broadcastStartDate: !releaseDate
      ? parsedStartDate?.toISOString()
      : undefined,
    broadcastEndDate: !releaseDate ? parsedEndDate?.toISOString() : undefined,
    releaseDate: releaseDate?.toISOString(),
    studios: rawAnime.studios?.split(", "),
    source: rawAnime.source,
    ageClassification: rawAnime.rating,
    popularity: rawAnime.popularity,
    watching: rawAnime.watching,
  };
}

export function parseRawAnimeSynopsis(
  rawAnimeSynopsis: RawAnimeSynopsis__Output
): Prisma.AnimeUpdateInput {
  return {
    synopsis: rawAnimeSynopsis.synopsis,
  };
}

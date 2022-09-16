import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

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

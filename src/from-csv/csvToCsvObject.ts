import { CsvObject } from "../types";

export const trimCitations = (text: string) => {
  // citation at the start or the end of the string
  return text.replace(/^"|"$/gm, "");
};

export const splitLine = (line: string, separator: string = ",") => {
  // just a coma between two citation marks
  const splitRegexp = new RegExp(`"(?:${separator})"`);

  return line.split(splitRegexp).map(trimCitations);
};

const getTranslationKeys = (
  line: string,
  separator: string = ","
): string[] => {
  const [_, ...rest] = line.split(separator).map(trimCitations);

  return rest;
};

export const csvToCsvObject = (csv: string): CsvObject => {
  const [keysLine, ...otherLines] = csv.split("\n");

  if (!keysLine) {
    throw Error("Empty CSV");
  }

  const keys = getTranslationKeys(keysLine);

  return otherLines
    .map((line: string) => splitLine(line))
    .reduce((acc, line) => {
      const [key, ...translations] = line;

      acc[key] = {};

      translations.forEach((translation, index) => {
        acc[key][keys[index]] = translation;
      });

      return acc;
    }, {} as CsvObject);
};

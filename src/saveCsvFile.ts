import { createWriteStream } from "fs";
import { CsvObject } from "./types";
import { wrapWithQuotes } from "./helpers";

// maybe not needed?
export const saveCsvFile = async (
  translationNames: string[],
  csvObject: CsvObject,
  path: string
) => {
  const file = createWriteStream(path);

  file.write(`"key",${translationNames.map(wrapWithQuotes).join(",")}\n`);

  Object.entries(csvObject).forEach(([translationKey, translations]) => {
    file.write(
      `"${translationKey}";"${translationNames
        .map((translationName) =>
          wrapWithQuotes(translations[translationName ?? ""])
        )
        .join(",")}\n`
    );
  });
};

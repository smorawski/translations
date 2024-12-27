import { translationFiles } from "./config";
import { createCsvObject } from "./src/createCsvObject";
import { flattenTranslationObject } from "./src/flattenTranslationObject";
import { loadTranslation } from "./src/loadTranslation";
import { saveCsvFile } from "./src/saveCsvFile";

Promise.all(
  translationFiles.map(async ({ name, path }) => ({
    name,
    content: flattenTranslationObject(await loadTranslation(path)),
  }))
)
  .then(createCsvObject)
  .then((csvObject) =>
    saveCsvFile(
      translationFiles.map(({ name }) => name),
      csvObject,
      "./translation.csv" // move to config?
    )
  );

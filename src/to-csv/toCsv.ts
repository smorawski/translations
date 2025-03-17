import { translationFiles } from "../../config";
import { createCsvObject } from "./createCsvObject";
import { flattenTranslationObject } from "./flattenTranslationObject";
import { loadTranslation } from "./loadTranslation";
import { saveCsvFile } from "./saveCsvFile";

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

import fs from "node:fs";
import { csvFile } from "../../config";
import { csvToCsvObject } from "./csvToCsvObject";
import { buildTranslationObject } from "./buildTranslationObject";
import { saveTranslationFile } from "./saveTranslationFile";
import { TranslationObject } from "../types";

fs.readFile(csvFile, (error, data) => {
  if (error) {
    throw error;
  }

  const csv = data.toString("utf8");

  const csvObject = csvToCsvObject(csv);

  const translationObject = buildTranslationObject(csvObject);

  Object.entries(translationObject).map(([language, translationObject]) => {
    saveTranslationFile(
      translationObject as TranslationObject,
      `./${language}.json`
    );
  });
});

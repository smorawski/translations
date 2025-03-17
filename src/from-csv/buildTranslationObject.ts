import { CsvObject, TranslationObject } from "../types";

const addTranslation = (
  translation: TranslationObject,
  keysString: string,
  value: string
) => {
  let target = translation;
  const keys = keysString.split(".");
  keys.forEach((key, index) => {
    // is last key?
    if (index + 1 === keys.length) {
      target[key] = value;
      return;
    }

    if (!target[key] || typeof target[key] !== "object") {
      target[key] = {};
    }

    target = target[key] as TranslationObject;
  });
};

const applyCsvEntry = (
  translation: TranslationObject,
  csvKey: string,
  csvEntry: Record<string, string>
) => {
  Object.entries(csvEntry).forEach(([language, value]) => {
    if (!translation[language]) {
      translation[language] = {};
    }
    addTranslation(translation[language] as TranslationObject, csvKey, value);
  });
};

export const buildTranslationObject = (csvObject: CsvObject) => {
  const result = {};

  Object.entries(csvObject).forEach(([key, value]) => {
    applyCsvEntry(result, key, value);
  });

  return result;
};

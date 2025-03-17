import { CsvObject, FlatTranslation } from "../types";

export const createCsvObject = (
  translations: { name: string; content: FlatTranslation }[]
): CsvObject => {
  const translationNames: string[] = [];
  const csvTranslations = translations.reduce((acc, current) => {
    translationNames.push(current.name);
    Object.entries(current.content).forEach(([key, value]) => {
      if (typeof acc[key] === "object") {
        acc[key][current.name] = value ?? "";
      } else {
        acc[key] = { [current.name]: value ?? "" };
      }
    });
    return acc;
  }, {} as CsvObject);

  // fill up missing translations
  Object.entries(csvTranslations).forEach(([key, entry]) => {
    translationNames.forEach((language) => {
      if (!Object.keys(entry).includes(language)) {
        csvTranslations[key][language] = "";
      }
    });
  });
  return csvTranslations;
};

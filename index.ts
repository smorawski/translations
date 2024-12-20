import fs, { writeFile } from "fs/promises";
import { translationFiles } from "./config";
import { createWriteStream } from "fs";

type TranslationObject = Record<string, string | object | unknown>;
type FlatTranslation = Record<string, string>;
type CsvObject = Record<string, Record<string, string>>;

const loadTranslationFile = async (
  filePath: string
): Promise<TranslationObject> => {
  const content = await fs.readFile(filePath);
  const stringContent = content.toString();
  return JSON.parse(stringContent);
};

const isTranslationObject = (
  element: TranslationObject | any
): element is TranslationObject => typeof element === "object";

const flattenLayer = (
  layer: TranslationObject,
  prefix?: string
): FlatTranslation => {
  const finalPrefix = prefix ? `${prefix}.` : "";

  return Object.entries(layer).reduce((acc, [key, entry]) => {
    if (typeof entry === "string") {
      acc[`${finalPrefix}${key}`] = entry;
    } else if (isTranslationObject(entry)) {
      return {
        ...acc,
        ...flattenLayer(entry, `${finalPrefix}${key}`),
      };
    }
    return acc;
  }, {} as FlatTranslation);
};

const createCsvObject = (
  translations: { name: string; content: FlatTranslation }[]
): CsvObject => {
  return translations.reduce((acc, current) => {
    Object.entries(current.content).forEach(([key, value]) => {
      if (typeof acc[key] === "object") {
        acc[key][current.name] = value;
      } else {
        acc[key] = { [current.name]: value };
      }
    });
    return acc;
  }, {} as CsvObject);
};

const saveCsvFile = async (
  translationNames: string[],
  csvObject: CsvObject
) => {
  const headers = ["key", ...translationNames];

  const file = createWriteStream("./translations.csv");

  file.write(`key;${translationNames.join(";")}\n`);

  Object.entries(csvObject).forEach(([translationKey, translations]) => {
    file.write(
      `${translationKey};${translationNames
        .map((translationName) => translations[translationName ?? ""])
        .join(";")}\n`
    );
  });
};

Promise.all(
  translationFiles.map(async ({ name, path }) => ({
    name,
    content: flattenLayer(await loadTranslationFile(path)),
  }))
)
  .then(createCsvObject)
  .then((csvObject) =>
    saveCsvFile(
      translationFiles.map(({ name }) => name),
      csvObject
    )
  );

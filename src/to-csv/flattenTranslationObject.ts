import { isTranslationObject } from "../helpers";
import { FlatTranslation, TranslationObject } from "../types";

export const flattenTranslationObject = (
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
        ...flattenTranslationObject(entry, `${finalPrefix}${key}`),
      };
    }
    return acc;
  }, {} as FlatTranslation);
};

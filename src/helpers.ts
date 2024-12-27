import { TranslationObject } from "./types";

export const wrapWithQuotes = (word: string): string => `"${word}"`;

export const isTranslationObject = (
  element: TranslationObject | any
): element is TranslationObject => typeof element === "object" && !!element;

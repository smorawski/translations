import { createWriteStream } from "fs";
import { TranslationObject } from "../types";

// maybe not needed?
export const saveTranslationFile = async (
  translationObject: TranslationObject,
  path: string
) => {
  const file = createWriteStream(path);

  file.write(JSON.stringify(translationObject));
};

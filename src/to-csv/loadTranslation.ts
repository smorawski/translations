import fs from "fs/promises";
import { TranslationObject } from "../types";

// maybe not needed - we will see
export const loadTranslation = async (
  filePath: string
): Promise<TranslationObject> => {
  const content = await fs.readFile(filePath);
  const stringContent = content.toString();
  return JSON.parse(stringContent);
};

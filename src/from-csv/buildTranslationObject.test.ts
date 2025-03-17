import { buildTranslationObject } from "./buildTranslationObject";
import { CsvObject } from "../types";

describe("buildTranslationObject()", () => {
  it("should change csvObject to translationObject", () => {
    const example: CsvObject = {
      "test1.param1": {
        pl: "translacja",
        en: "translation",
      },
      "test1.param2": {
        pl: "lokalizacja",
        en: "localisation",
      },
      "test1.param3.deepParam1": {
        pl: "internacjonalizacja",
        en: "internationalisation",
      },
    };

    expect(buildTranslationObject(example)).toEqual({
      pl: {
        test1: {
          param1: "translacja",
          param2: "lokalizacja",
          param3: {
            deepParam1: "internacjonalizacja",
          },
        },
      },
      en: {
        test1: {
          param1: "translation",
          param2: "localisation",
          param3: {
            deepParam1: "internationalisation",
          },
        },
      },
    });
  });

  it("should build incomplete translationObject", () => {
    const example: CsvObject = {
      "test1.param1": {
        pl: "translacja",
        en: "translation",
        fr: "traduction",
      },
      "test1.param2": {
        pl: "lokalizacja",
        en: "localisation",
      },
      "test1.param3.deepParam1": {
        pl: "internacjonalizacja",
        en: "internationalisation",
      },
    };

    expect(buildTranslationObject(example)).toEqual({
      pl: {
        test1: {
          param1: "translacja",
          param2: "lokalizacja",
          param3: {
            deepParam1: "internacjonalizacja",
          },
        },
      },
      en: {
        test1: {
          param1: "translation",
          param2: "localisation",
          param3: {
            deepParam1: "internationalisation",
          },
        },
      },
      fr: {
        test1: {
          param1: "traduction",
        },
      },
    });
  });
});

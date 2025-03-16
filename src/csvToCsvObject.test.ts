import { csvToCsvObject, splitLine, trimCitations } from "./csvToCsvObject";
import { translationExample } from "./examples/translation-example";

describe("csvToCsvObject", () => {
  it("should return an object from csv file content", () => {
    expect(csvToCsvObject(translationExample)).toEqual({
      "main.sidebar.project": { en: "Project", pl: "Projekt" },
      "main.sidebar.title": {
        en: "Name of the project.",
        pl: "Nazwa projektu.",
      },
      "main.statusbar.statusbar_empty": {
        en: "Empty! No entries added yet.",
        pl: "Pusto! Brak wpisów.",
      },
      "main.statusbar.statusbar_ok": { en: "Ok.", pl: "Ok." },
    });
  });

  describe("trimCitations()", () => {
    it("should remove citations around the string", () => {
      expect(trimCitations('"welcome to Poland"')).toEqual("welcome to Poland");
    });

    it("should leave citations inside the text", () => {
      expect(trimCitations('"welcome to " Poland"')).toEqual(
        'welcome to " Poland'
      );
    });
  });

  describe("splitLine()", () => {
    it("should return an array with split translations", () => {
      const testLine = '"en","Lorem Ipsum","dolor"';

      expect(splitLine(testLine)).toEqual(["en", "Lorem Ipsum", "dolor"]);
    });

    it("should not split by the mid-word delimeter", () => {
      const testLine = '"en","Lorem, Ipsum","dolor"';

      expect(splitLine(testLine)).toEqual(["en", "Lorem, Ipsum", "dolor"]);
    });
  });
});

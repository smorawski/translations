import { flattenTranslationObject } from "./flattenTranslationObject";

describe("flattenTranslationObject", () => {
  it("should deep flatten an object", () => {
    const translationObject = {
      main: {
        sidebar: {
          project: "Project",
          title: "Name of the project.",
        },
        statusbar: {
          empty: "Empty! No entries added yet.",
          ok: "Ok.",
        },
      },
      container: {
        title: "Welcome",
        subTitle: "How are you today?",
      },
    };

    expect(flattenTranslationObject(translationObject)).toEqual({
      "main.sidebar.project": "Project",
      "main.sidebar.title": "Name of the project.",
      "main.statusbar.empty": "Empty! No entries added yet.",
      "main.statusbar.ok": "Ok.",
      "container.title": "Welcome",
      "container.subTitle": "How are you today?",
    });
  });

  it("should ignore non strings", () => {
    const translationObject = {
      ignored: {
        number: 12,
        null: null,
        boolean: false,
        undefined: undefined,
      },
      strings: {
        number: "12",
        null: "null",
        boolean: "false",
        undefined: "undefined",
      },
    };

    expect(flattenTranslationObject(translationObject)).toEqual({
      "strings.boolean": "false",
      "strings.null": "null",
      "strings.number": "12",
      "strings.undefined": "undefined",
    });
  });
});

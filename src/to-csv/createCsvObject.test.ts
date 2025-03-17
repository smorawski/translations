import { createCsvObject } from "./createCsvObject";

describe("createCsvObject", () => {
  it("should join multiple translation and return a csv object", () => {
    const translations = [
      {
        name: "en",
        content: {
          "main.sidebar.project": "Project",
          "main.sidebar.title": "Name of the project.",
          "main.statusbar.empty": "Empty! No entries added yet.",
          "main.statusbar.ok": "Ok.",
          "container.title": "Welcome",
          "container.subTitle": "How are you today?",
        },
      },
      {
        name: "pl",
        content: {
          "main.sidebar.project": "Projekt",
          "main.sidebar.title": "Nazwa projektu.",
          "main.statusbar.empty": "Pusto! Wciąż brak wpisów.",
          "main.statusbar.ok": "Ok.",
          "container.title": "Witaj",
          "container.subTitle": "Jak się masz?",
        },
      },
    ];

    expect(createCsvObject(translations)).toEqual({
      "main.sidebar.project": { en: "Project", pl: "Projekt" },
      "main.sidebar.title": {
        en: "Name of the project.",
        pl: "Nazwa projektu.",
      },
      "main.statusbar.empty": {
        en: "Empty! No entries added yet.",
        pl: "Pusto! Wciąż brak wpisów.",
      },
      "main.statusbar.ok": {
        en: "Ok.",
        pl: "Ok.",
      },
      "container.title": {
        en: "Welcome",
        pl: "Witaj",
      },
      "container.subTitle": {
        en: "How are you today?",
        pl: "Jak się masz?",
      },
    });
  });

  it("should add empty string, if a translation is missing in a translation", () => {
    const translations = [
      {
        name: "en",
        content: {
          "main.sidebar.project": "Project",
          "main.sidebar.title": "Name of the project.",
          "main.statusbar.empty": "Empty! No entries added yet.",
          "main.statusbar.ok": "Ok.",
          "container.title": "Welcome",
          "container.subTitle": "How are you today?",
          "english.only": "English only!",
        },
      },
      {
        name: "pl",
        content: {
          "main.sidebar.project": "Projekt",
          "main.sidebar.title": "Nazwa projektu.",
          "main.statusbar.empty": "Pusto! Wciąż brak wpisów.",
          "main.statusbar.ok": "Ok.",
          "container.title": "Witaj",
          "container.subTitle": "Jak się masz?",
        },
      },
    ];

    expect(createCsvObject(translations)).toEqual({
      "main.sidebar.project": { en: "Project", pl: "Projekt" },
      "main.sidebar.title": {
        en: "Name of the project.",
        pl: "Nazwa projektu.",
      },
      "main.statusbar.empty": {
        en: "Empty! No entries added yet.",
        pl: "Pusto! Wciąż brak wpisów.",
      },
      "main.statusbar.ok": {
        en: "Ok.",
        pl: "Ok.",
      },
      "container.title": {
        en: "Welcome",
        pl: "Witaj",
      },
      "container.subTitle": {
        en: "How are you today?",
        pl: "Jak się masz?",
      },
      "english.only": {
        en: "English only!",
        pl: "",
      },
    });
  });
});

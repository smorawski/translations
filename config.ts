type TranslationFile = {
  name: string;
  path: string;
};

export const translationFiles: TranslationFile[] = [
  {
    name: "en",
    path: "./src/examples/en.json",
  },
  {
    name: "pl",
    path: "./src/examples/pl.json",
  },
];

export const csvFile: string = "./src/examples/example.csv";

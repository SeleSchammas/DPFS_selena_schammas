import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const dataPath = join(process.cwd(), "data");

export const readJSON = async (fileName) => {
  try {
    const file = await readFile(join(dataPath, `${fileName}.json`), "utf8");
    return JSON.parse(file);
  } catch (error) {
    console.error("Error leyendo archivo", fileName, error);
    return [];
  }
};

export const writeJSON = async (fileName, data) => {
  try {
    await writeFile(
      join(dataPath, `${fileName}.json`),
      JSON.stringify(data, null, 2),
      "utf8"
    );
  } catch (error) {
    console.error("Error escribiendo archivo", fileName, error);
  }
};

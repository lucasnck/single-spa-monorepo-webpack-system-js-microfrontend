import * as path from "path";
import * as fs from "fs";
import * as readline from "readline";
import { IPageOptions } from "../types";
import { cases } from "./case-styles";

const CURR_DIR = process.cwd();

const pagesDir = path.relative(CURR_DIR, "../root/.env");

export async function modifyEnv(
  options: IPageOptions,
  next: (options: IPageOptions) => Promise<void>
) {
  const fileStream = fs.createReadStream(pagesDir);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let text = "";

  const { projectName, projectPort } = options;

  const snackName = cases.snack(projectName);
  const kebabName = cases.kebab(projectName);

  for await (const line of rl) {
    if (line.match("#/DNC BUILDER_ENV_DEV")) {
      text += `${snackName}_PATH=//localhost:${projectPort}` + "\r\n";
    }

    if (line.match("#/DNC BUILDER_ENV_UAT")) {
      text += `# ${snackName}_PATH=${kebabName}` + "\r\n";
    }

    text += line + "\r\n";
  }

  fs.writeFile(pagesDir, text, "utf-8", function (err) {
    if (err) throw err;
    console.log("\x1b[32m", `MODIFY_ENV_DEV`, "\x1b[0m", `COMPLETED`);
    next(options);
  });
}

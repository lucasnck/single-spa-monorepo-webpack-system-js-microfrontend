import * as path from "path";
import * as fs from "fs";
import * as readline from "readline";
import { IPageOptions } from "../types";
import { cases } from "./case-styles";

const CURR_DIR = process.cwd();

const pagesDir = path.relative(CURR_DIR, "../root/src/utils/env.ts");

export async function modifyRootEnv(
  options: IPageOptions,
  next: (options: IPageOptions) => Promise<void>
) {
  const fileStream = fs.createReadStream(pagesDir);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let text = "";

  const { projectName } = options;

  const name = cases.snack(projectName);

  for await (const line of rl) {
    if (line.match("#/DNC BUILDER_ROOT_ENV")) {
      text += `${name}_PATH: process.env.${name}_PATH,` + "\r\n";
    }

    text += line + "\r\n";
  }

  fs.writeFile(pagesDir, text, "utf-8", function (err) {
    if (err) throw err;
    console.log(
      "\x1b[32m",
      `MODIFY_ROOT_ENV`,
      "\x1b[0m",
      `COMPLETED`
    );
    next(options);
  });
}

import * as fs from "fs";
import * as path from "path";
import * as shell from "shelljs";
import { IPageOptions } from "../types";

const CURR_DIR = process.cwd();

export async function postProcess(options: IPageOptions) {
  const isNode = fs.existsSync(path.join(options.templatePath, "package.json"));
  if (isNode) {
  }

  const rootDir = path.relative(CURR_DIR, "../root");

  let code = 0;

  shell.cd(rootDir);
  code = shell.exec("yarn format").code;

  const baseDir = path.relative(CURR_DIR, "../../");

  shell.cd(baseDir);
  code = shell.exec("yarn packages").code;

  if (code !== 0) {
    return;
  }

  console.log("\x1b[32m", `ROOT`, "\x1b[0m", `- FORMAT `, `COMPLETED`);
  console.log("\x1b[32m", `ALL BUILDERS COMPLETED`, "\x1b[0m");
  return;
}

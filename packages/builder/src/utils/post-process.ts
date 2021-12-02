import * as fs from "fs";
import * as path from "path";
import * as shell from "shelljs";
import { CliOptions } from "../types";

const CURR_DIR = process.cwd();

export async function postProcess(options: CliOptions) {
  const isNode = fs.existsSync(path.join(options.templatePath, "package.json"));
  if (isNode) {
  }

  const rootDir = path.relative(CURR_DIR, "../root");

  shell.cd(rootDir);
  const result = shell.exec("yarn format");

  if (result.code !== 0) {
    return;
  }

  console.log("\x1b[32m", `ROOT`, "\x1b[0m", `- FORMAT `, `COMPLETED`);
  console.log("\x1b[32m", `ALL BUILDERS COMPLETED`, "\x1b[0m");
  return;
}

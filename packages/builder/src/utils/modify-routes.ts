import * as path from "path";
import * as fs from "fs";
import * as readline from "readline";
import { IPageOptions } from "../types";
import { cases } from "./case-styles";

const CURR_DIR = process.cwd();

const pagesDir = path.relative(CURR_DIR, "../root/src/routes/routes.ts");

export async function modifyRoutes(
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

  for await (const line of rl) {
    if (line.match("#/DNC BUILDER_ROUTES")) {
      text +=
        `{
        type: "route",
        path: "/${projectName}",
        routes: [
          {
            type: "application",
            name: "@exm/${projectName}",
            src: \`\${env.${cases.snack(
              projectName
            )}_PATH}/exm-${projectName}.js\`,
          },
        ],
      },` + "\r\n";
    }

    text += line + "\r\n";
  }

  fs.writeFile(pagesDir, text, "utf-8", function (err) {
    if (err) throw err;
    console.log(
      "\x1b[32m",
      `MODIFY_ROUTES`,
      "\x1b[0m",
      `COMPLETED`
    );
    next(options);
  });
}

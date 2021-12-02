import * as path from "path";
import * as fs from "fs";
import * as readline from "readline";
import { CliOptions } from "..";

const CURR_DIR = process.cwd();

const pagesDir = path.relative(CURR_DIR, "../root/src/routes/routes.ts");

export async function modifyRoutes(
  options: CliOptions,
  next: (options: CliOptions) => void
) {
  const fileStream = fs.createReadStream(pagesDir);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let text = "";

  const { projectName } = options;

  for await (const line of rl) {
    if (line.match("];")) {
      text += `{
        type: "route",
        path: "/${projectName}",
        routes: [
          {
            type: "application",
            name: "@exm/${projectName}",
            src: "\${env.${projectName.toUpperCase()}_PATH}/exm-${projectName}.js",
          },
        ],
      },`;
    }

    text += line;
  }

  fs.writeFile(pagesDir, text, "utf-8", function (err) {
    if (err) throw err;
    console.log("root add new route config complete");
    next(options);
  });
}

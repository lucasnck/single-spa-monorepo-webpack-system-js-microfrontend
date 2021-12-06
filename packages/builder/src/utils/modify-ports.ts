import * as path from "path";
import * as fs from "fs";
import * as readline from "readline";
import { IPageOptions } from "../types";
import { cases } from "./case-styles";

const CURR_DIR = process.cwd();

const pagesDir = path.relative(CURR_DIR, "../../package.json");

function addPort(line: string, projectPort: number) {
  // split all spaces
  let words = line.split(" ");

  // get ports index
  const ports = words[7].split(",");
  ports.push(projectPort.toString());

  // join ports with ,
  const joinPorts = ports.join(",");
  words[7] = joinPorts;

  // add again to file
  return words.join(" ");
}

export async function modifyPorts(
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

  const name = cases.snack(projectName).toLowerCase();

  for await (const line of rl) {
    if (line.match("#/DNC BUILDER_PORTS")) {
      const modifiedLine = addPort(line, projectPort);

      text += modifiedLine + "\r\n";
    } else if (line.match("#/DNC BUILDER_SCRIPTS")) {
      text += `    "start:${name}": "yarn start:core --scope=@exm/${name}",
    "build:${name}": "lerna run --scope=@exm/${name} build",\r\n`;

      text += line + "\r\n";
    } else {
      text += line + "\r\n";
    }
  }

  fs.writeFile(pagesDir, text, "utf-8", function (err) {
    if (err) throw err;
    console.log("\x1b[32m", `MODIFY_PORTS`, "\x1b[0m", `COMPLETED`);
    next(options);
  });
}

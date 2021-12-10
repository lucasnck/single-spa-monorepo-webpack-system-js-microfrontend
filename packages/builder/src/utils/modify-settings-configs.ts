import * as path from "path";
import * as fs from "fs";
import * as readline from "readline";
import { ISettingsOptions } from "../types";

const CURR_DIR = process.cwd();

const pagesDir = path.relative(CURR_DIR, "../settings/src/utils/configs.ts");

export async function modifySettingsConfigs(
  options: ISettingsOptions,
  next: (options: ISettingsOptions) => Promise<void>
) {
  const fileStream = fs.createReadStream(pagesDir);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let text = "";

  const { projectName } = options;

  for await (const line of rl) {
    if (line.match("#/DNC MODIFY_SETTINGS_CONFIGS_IMPORTS")) {
      text +=
        `import { ${projectName} } from "../portals/${projectName}";` + "\r\n";
      console.log(
        "\x1b[32m",
        `MODIFY_SETTINGS_CONFIGS_IMPORTS`,
        "\x1b[0m",
        `COMPLETED`
      );
    }
    if (line.match("#/DNC MODIFY_SETTINGS_CONFIGS_LOOKUP")) {
      text += `  ${projectName},` + "\r\n";
      console.log(
        "\x1b[32m",
        `MODIFY_SETTINGS_CONFIGS_LOOKUP`,
        "\x1b[0m",
        `COMPLETED`
      );
    }

    text += line + "\r\n";
  }

  fs.writeFile(pagesDir, text, "utf-8", function (err) {
    if (err) throw err;
    console.log("\x1b[32m", `MODIFY_SETTINGS_CONFIGS`, "\x1b[0m", `COMPLETED`);
    next(options);
  });
}

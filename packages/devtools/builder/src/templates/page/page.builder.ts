import * as path from "path";
import { cases } from "../../utils/case-styles";
import { modifyCore } from "../../utils/modify-core";
import {
  createDirectoryContents,
  createProject,
} from "../../utils/build-project";
import { IPageOptions, IOptions } from "../../types";

const CURR_DIR = process.cwd();
const targetPath = path.relative(CURR_DIR, "../pages");

export function pageBuilder(projectChoice: string, answers: any) {
  const projectName = cases.kebab(answers["name"] as string);
  const projectPort = answers["port"] as number;
  const templatePath = path.join(CURR_DIR, "src/templates", projectChoice);

  const options: IPageOptions = {
    templatePath: templatePath,
    targetName: projectName,
    targetPath,
    projectName,
    projectPort,
  };

  if (!createProject(options)) {
    return;
  }

  createDirectoryContents(options);
  console.log("\x1b[32m", `COPY_FILES`, "\x1b[0m", `COMPLETED`);

  modifyCore(options);
}

export const PAGE_QUESTIONS: IOptions[] = [
  {
    name: "name",
    type: "input",
    message: "Project name - Use Kabab Case (ex: new-page):",
  },
  {
    name: "port",
    type: "input",
    message: "Project port (ex: 9000):",
  },
];

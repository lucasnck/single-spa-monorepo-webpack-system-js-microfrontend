import * as path from "path";
import { cases } from "../../utils/case-styles";
import { modifyCore } from "../../utils/modify-core";
import {
  createDirectoryContents,
  createProject,
} from "../../utils/build-project";
import { CliOptions, IOptions } from "../../types";

const CURR_DIR = process.cwd();
const pagesDir = path.relative(CURR_DIR, "../pages");

export function pageBuilder(projectChoice: string, answers: any) {
  const projectName = cases.kebab(answers["name"] as string);
  const projectPort = answers["port"] as number;
  const templatePath = path.join(CURR_DIR, "src/templates", projectChoice);

  const tartgetPath = path.join(pagesDir, projectName);

  const options: CliOptions = {
    projectName,
    projectPort,
    templateName: projectChoice,
    templatePath: templatePath,
    tartgetPath,
  };

  if (!createProject(tartgetPath)) {
    return;
  }

  createDirectoryContents(templatePath, projectName, projectName, projectPort);

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

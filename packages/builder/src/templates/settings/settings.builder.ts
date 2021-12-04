import * as path from "path";
import { IOptions, ISettingsOptions } from "../../types";
import {
  createDirectoryContents,
  createProject,
} from "../../utils/build-project";
import { cases } from "../../utils/case-styles";

const CURR_DIR = process.cwd();
const targetPath = path.relative(CURR_DIR, "../settings/src/portals");

export function settingsBuilder(projectChoice: string, answers: any) {
  const title = answers["title"];
  const projectName = cases.kebab(title);
  const domain = answers["domain"];
  const templatePath = path.join(CURR_DIR, "src/templates", projectChoice);

  const options: ISettingsOptions = {
    templatePath: templatePath,
    targetName: projectName,
    targetPath,
    title,
    domain,
  };

  if (!createProject(options)) {
    return;
  }

  createDirectoryContents(options);

  // modifyCore(options);
}

export const SETTINGS_QUESTIONS: IOptions[] = [
  {
    name: "title",
    type: "input",
    message: "Title (ex: Ex Modules):",
  },
  {
    name: "domain",
    type: "input",
    message: "Domain (ex: app.exm.com):",
  },
];

import * as fs from "fs";
import * as path from "path";
import * as inquirer from "inquirer";
import * as yargs from "yargs";
import { cases } from "./utils/case-styles";
import { modifyCore } from "./utils/modify-core";
import { createDirectoryContents, createProject } from "./utils/build-project";
import { CliOptions } from "./types";

const CHOICES = fs.readdirSync(path.join(__dirname, "templates"));

const QUESTIONS = [
  {
    name: "template",
    type: "list",
    message: "Choose builder type",
    choices: CHOICES,
  },
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

const CURR_DIR = process.cwd();

const pagesDir = path.relative(CURR_DIR, "../pages");

inquirer.prompt(QUESTIONS).then((answers) => {
  answers = Object.assign({}, answers, yargs.argv);

  const projectChoice = answers["template"];
  const projectName = cases.kebab(answers["name"] as string);
  const projectPort = answers["port"] as number;
  const templatePath = path.join(__dirname, "templates", projectChoice);

  const tartgetPath = path.join(pagesDir, projectName);

  const options: CliOptions = {
    projectName,
    projectPort,
    templateName: projectChoice,
    templatePath,
    tartgetPath,
  };

  if (!createProject(tartgetPath)) {
    return;
  }

  createDirectoryContents(templatePath, projectName, projectName, projectPort);

  modifyCore(options);
});

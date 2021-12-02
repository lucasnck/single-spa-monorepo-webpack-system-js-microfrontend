import * as fs from "fs";
import * as path from "path";
import * as inquirer from "inquirer";
import chalk from "chalk";
import * as ejs from "ejs";
import * as yargs from "yargs";
import * as shell from "shelljs";
import { modifyRoutes } from "./utils/modify-routes";

export interface CliOptions {
  projectName: string;
  projectPort: number;
  templateName: string;
  templatePath: string;
  tartgetPath: string;
}

export interface TemplateData {
  projectName: string;
  projectPort: number;
}

const SKIP_FILES = ["node_modules", ".template.json"];

const CHOICES = fs.readdirSync(path.join(__dirname, "templates"));
const QUESTIONS = [
  {
    name: "template",
    type: "list",
    message: "Choose builder",
    choices: CHOICES,
  },
  {
    name: "name",
    type: "input",
    message: "Project name:",
  },
  {
    name: "port",
    type: "input",
    message: "Project port (ex: 9000):",
  },
];

console.log("path", path);

const CURR_DIR = process.cwd();

const pagesDir = path.relative(CURR_DIR, "../pages");

console.log("CURR_DIR", CURR_DIR);

export function render(content: string, data: TemplateData) {
  return ejs.render(content, data);
}

function postProcess(options: CliOptions) {
  const isNode = fs.existsSync(path.join(options.templatePath, "package.json"));
  if (isNode) {
  }

  const rootDir = path.relative(CURR_DIR, "../root");

  console.log("rootdir", rootDir);
  shell.cd(rootDir);
  const result = shell.exec("yarn format");
  
  if (result.code !== 0) {
    return false;
  }

  console.log("root format complete");
  return true;
}

function createDirectoryContents(
  templatePath: string,
  projectPath: string,
  projectName: string,
  projectPort: number
) {
  // read all files/folders (1 level) from template folder
  const filesToCreate = fs.readdirSync(templatePath);
  // loop each file/folder
  filesToCreate.forEach((file) => {
    const origFilePath = path.join(templatePath, file);

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    // skip files that should not be copied
    if (SKIP_FILES.indexOf(file) > -1) return;

    if (stats.isFile()) {
      // read file content and transform it using template engine
      let contents = fs.readFileSync(origFilePath, "utf8");
      contents = render(contents, { projectName, projectPort });
      // write file to destination folder
      const writePath = path.join(pagesDir, projectPath, file);
      fs.writeFileSync(writePath, contents, "utf8");

      // read file content and transform it using template engine
    } else if (stats.isDirectory()) {
      // create folder in destination folder
      fs.mkdirSync(path.join(pagesDir, projectPath, file));
      // copy files/folder inside current folder recursively
      createDirectoryContents(
        path.join(templatePath, file),
        path.join(projectPath, file),
        projectName,
        projectPort
      );
    }
  });
}

function createProject(projectPath: string) {
  if (fs.existsSync(projectPath)) {
    console.log(
      chalk.red(`Folder ${projectPath} exists. Delete or use another name.`)
    );
    return false;
  }
  fs.mkdirSync(projectPath);

  return true;
}

async function finishJob(options: CliOptions) {
  await modifyRoutes(options, postProcess);
}

inquirer.prompt(QUESTIONS).then((answers) => {
  answers = Object.assign({}, answers, yargs.argv);
  const projectChoice = answers["template"];
  const projectName = answers["name"];
  const projectPort = answers["port"];
  const templatePath = path.join(__dirname, "templates", projectChoice);

  console.log("templatePath", templatePath);
  console.log("pagesDir", pagesDir);

  const tartgetPath = path.join(pagesDir, projectName);

  console.log("tartgetPath", tartgetPath);

  const options: CliOptions = {
    projectName,
    projectPort,
    templateName: projectChoice,
    templatePath,
    tartgetPath,
  };
  console.log(options);

  if (!createProject(tartgetPath)) {
    return;
  }

  // createDirectoryContents(templatePath, projectName, projectName, projectPort);

  finishJob(options);
});

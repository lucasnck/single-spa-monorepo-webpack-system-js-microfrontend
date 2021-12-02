import chalk from "chalk";
import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
import { TemplateData } from "src/types";

const SKIP_FILES = ["node_modules", ".template.json"];

const CURR_DIR = process.cwd();

const pagesDir = path.relative(CURR_DIR, "../pages");

export function render(content: string, data: TemplateData) {
  return ejs.render(content, data);
}

export function createDirectoryContents(
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

export function createProject(projectPath: string) {
  if (fs.existsSync(projectPath)) {
    console.log(
      chalk.red(`Folder ${projectPath} exists. Delete or use another name.`)
    );
    return false;
  }
  fs.mkdirSync(projectPath);

  return true;
}

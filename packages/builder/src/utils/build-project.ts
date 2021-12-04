import chalk from "chalk";
import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
import { IInputOptions } from "src/types";

const SKIP_FILES = ["node_modules", "page.builder.ts", "settings.builder.ts"];

export function render(content: string, data: IInputOptions) {
  return ejs.render(content, data);
}

export function createDirectoryContents(options: IInputOptions) {
  const { templatePath, targetPath, targetName } = options;

  const target = path.join(targetPath, targetName);

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
      contents = render(contents, options);
      // write file to destination folder
      const writePath = path.join(target, file);
      fs.writeFileSync(writePath, contents, "utf8");
      // read file content and transform it using template engine
    } else if (stats.isDirectory()) {
      // create folder in destination folder
      fs.mkdirSync(path.join(target, file));
      // copy files/folder inside current folder recursively

      createDirectoryContents({
        ...options,
        templatePath: path.join(templatePath, file),
        targetPath: target,
        targetName: file,
      });
    }
  });
}

export function createProject(options: IInputOptions) {
  const { targetPath, targetName } = options;

  const target = path.join(targetPath, targetName);

  if (fs.existsSync(target)) {
    console.log(
      chalk.red(`Folder ${target} exists. Delete or use another name.`)
    );
    return false;
  }
  fs.mkdirSync(target);

  return true;
}

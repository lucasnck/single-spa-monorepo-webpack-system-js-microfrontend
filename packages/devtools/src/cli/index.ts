import * as fs from "fs";
import * as path from "path";
import * as inquirer from "inquirer";
import * as yargs from "yargs";
import { IOptions } from "./types";
import { TEMPLATE_BUILDER, TEMPLATE_QUESTIONS } from "./template.questions";

const CHOICES = fs.readdirSync(path.join(__dirname, "templates"));

const QUESTIONS: IOptions[] = [
  {
    name: "template",
    type: "list",
    message: "Choose builder type",
    choices: CHOICES,
  },
];

inquirer.prompt(QUESTIONS).then((answers) => {
  answers = Object.assign({}, answers, yargs.argv);

  const projectChoice = answers["template"];

  inquirer.prompt(TEMPLATE_QUESTIONS[projectChoice]).then((subAnswers) => {
    TEMPLATE_BUILDER[projectChoice](projectChoice, subAnswers);
  });
});

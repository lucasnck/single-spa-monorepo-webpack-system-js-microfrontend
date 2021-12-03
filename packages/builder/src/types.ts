export interface IOptions {
  name: string;
  type: string;
  message: string;
  choices?: string[];
}

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

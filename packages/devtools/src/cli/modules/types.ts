export interface IOptions {
  name: string;
  type: string;
  message: string;
  choices?: string[];
}

export interface IInputOptions {
  templatePath: string;
  targetPath: string;
  targetName: string;
  projectName: string;
}

export interface IPageOptions extends IInputOptions {
  projectPort: number;
}

export interface ISettingsOptions extends IInputOptions {
  title: string;
  domain: string;
}

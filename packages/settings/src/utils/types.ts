export interface ISettings {
  id: string;
  title: string;
  domain: string;
  menu?: {
    title: string;
  }[];
}

export interface IConfigs {
  [key: string]: ISettings;
}

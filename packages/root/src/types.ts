export interface IRoute {
  type: string;
  name: string;
  src: string;
}

export interface IApp {
  type: string;
  name?: string;
  src?: string;
  routes?: IRoute[];
  default?: boolean;
  path?: string;
}

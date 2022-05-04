import { routes } from "./routes/routes";
import { IApp } from "./types";
import { env } from "./utils/env";

export const apps: IApp[] = [
  {
    type: "application",
    name: "@exm/layout",
    src: `${env.TEMPLATE_PATH}/exm-template.js`,
  },
  // #/DNC BUILDER_APPS
  ...routes,
];

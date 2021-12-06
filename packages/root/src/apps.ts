import { routes } from "./routes/routes";
import { env } from "./utils/env";

export const apps = [
  {
    type: "application",
    name: "@exm/settings",
    src: `${env.SETTINGS_PATH}/exm-settings.js`,
  },
  {
    type: "application",
    name: "@exm/template",
    src: `${env.TEMPLATE_PATH}/exm-template.js`,
  },
  ...routes,
  // #/DNC BUILDER_APPS
];

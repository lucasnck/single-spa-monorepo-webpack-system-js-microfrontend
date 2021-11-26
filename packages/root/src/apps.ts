import { routes } from "./routes/routes";
import { env } from "./utils/env";

export const apps = [
  {
    type: "application",
    name: "@exm/template",
    src: `${env.TEMPLATE_PATH}/exm-template.js`,
  },
  ...routes,
];

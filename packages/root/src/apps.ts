import { routes } from "./routes/routes";

export const apps = [
  {
    type: "application",
    name: "@exm/template",
    src: "//localhost:9004/exm-template.js",
  },
  ...routes,
];

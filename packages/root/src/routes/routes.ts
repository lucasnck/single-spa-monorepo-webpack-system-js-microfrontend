import { env } from "../utils/env";

export const routes = [
  {
    type: "route",
    routes: [
      {
        type: "application",
        name: "@exm/login",
        src: `${env.LOGIN_PATH}/exm-login.js`,
      },
    ],
    default: true,
  },
  {
    type: "route",
    path: "/home",
    routes: [
      {
        type: "application",
        name: "@exm/home",
        src: `${env.HOME_PATH}/exm-home.js`,
      },
    ],
  },
];

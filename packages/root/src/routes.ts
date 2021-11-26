export const routes = [
  {
    type: "route",
    routes: [
      {
        type: "application",
        name: "@exm/login",
        src: "//localhost:9001/exm-login.js",
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
        src: "//localhost:9002/exm-home.js",
      },
    ],
  },
];

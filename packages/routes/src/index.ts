export const routes = {
  containerEl: "#root",
  routes: [
    {
      type: "application",
      name: "@exm/template",
    },
    {
      type: "route",
      routes: [{ type: "application", name: "@exm/login" }],
      default: true,
    },
    {
      type: "route",
      path: "/home",
      routes: [{ type: "application", name: "@exm/home" }],
    },
  ],
};

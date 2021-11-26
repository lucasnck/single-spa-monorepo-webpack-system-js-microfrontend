import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import { apps } from "./apps";

const baseApps = {
  containerEl: "#root",
  routes: apps,
};

baseApps.routes = baseApps.routes.map((item: any) => {
  let isRoute = item.type === "route";

  if (isRoute) {
    item.routes.forEach((route) => {
      // @ts-ignore
      window.importMapOverrides.addOverride(route.name, route.src);
    });
  } else {
    // @ts-ignore
    window.importMapOverrides.addOverride(item.name, item.src);
  }

  delete item.src;
  return item;
});

const routesConfig = constructRoutes(baseApps);

const applications = constructApplications({
  routes: routesConfig,
  loadApp({ name }) {
    return System.import(name);
  },
});

const layoutEngine = constructLayoutEngine({
  routes: routesConfig,
  applications,
});

(async () => {
  await System.import("@exm/template");
  applications.forEach(registerApplication);
  layoutEngine.activate();
  start();
})();

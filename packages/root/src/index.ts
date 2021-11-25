import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
// @ts-ignore
import { routes } from "@exm/routes";

const routesConfig = constructRoutes(routes);

const mappedRoutes = constructRoutes(routesConfig);

const applications = constructApplications({
  routes: mappedRoutes,
  loadApp({ name }) {
    return System.import(name);
  },
});

const layoutEngine = constructLayoutEngine({
  routes: mappedRoutes,
  applications,
});

System.import("@exm/routes").then(() => {
  applications.forEach(registerApplication);
  layoutEngine.activate();
  start();
});

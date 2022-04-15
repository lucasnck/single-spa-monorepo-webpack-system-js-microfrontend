import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import routes from "./routes.json";

const baseApps = {
  containerEl: "#root",
  routes: routes,
};

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
  await System.import(`@exm/settings`);
  applications.forEach(registerApplication);
  layoutEngine.activate();
  start();
})();

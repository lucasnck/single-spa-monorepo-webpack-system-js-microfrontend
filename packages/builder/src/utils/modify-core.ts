import { CliOptions } from "../types";
import { modifyEnv } from "./modify-env";
import { modifyPorts } from "./modify-ports";
import { modifyRootEnv } from "./modify-root-env";
import { modifyRoutes } from "./modify-routes";
import { postProcess } from "./post-process";

export async function modifyCore(options: CliOptions) {
  await modifyRoutes(options, (options) => {
    return modifyEnv(options, (options) => {
      return modifyRootEnv(options, (options) => {
        return modifyPorts(options, postProcess);
      });
    });
  });
}

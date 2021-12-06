import { IPageOptions } from "../types";
import { modifyEnv } from "./modify-env";
import { modifyBasePackage } from "./modify-base-package";
import { modifyRootEnv } from "./modify-root-env";
import { modifyRoutes } from "./modify-routes";
import { postProcess } from "./post-process";

export async function modifyCore(options: IPageOptions) {
  await modifyRoutes(options, (options) => {
    return modifyEnv(options, (options) => {
      return modifyRootEnv(options, (options) => {
        return modifyBasePackage(options, postProcess);
      });
    });
  });
}

import { headerCycles } from "./header";
import { menuCycles } from "./menu";
import { footerCycles } from "./footer";

export const bootstrap = [
  headerCycles.bootstrap,
  menuCycles.bootstrap,
  footerCycles.bootstrap,
];
export const mount = [headerCycles.mount, menuCycles.mount, footerCycles.mount];
export const unmount = [
  headerCycles.unmount,
  menuCycles.unmount,
  footerCycles.unmount,
];

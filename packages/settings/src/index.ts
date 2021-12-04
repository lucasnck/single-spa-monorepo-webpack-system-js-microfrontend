import DEF from "./portals/DEF";
import { configs } from "./utils/configs";
import { env } from "./utils/env";

const selectedConfig = configs[env.PORTAL_IDENTIFICATION] ?? DEF;

const config = { ...DEF, ...selectedConfig };

export default config;

import { configs } from "./utils/configs";
import { env } from "./utils/env";

const selectedConfig = configs[env.PORTAL_IDENTIFICATION] ?? configs.DEF;

const config = { ...configs.DEF, ...selectedConfig };

export default config;

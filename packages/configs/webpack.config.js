const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const path = require("path");

const config = (package, webpackConfigEnv, argv) => {

  const name = package.name.split("/")[1];

  const defaultConfig = singleSpaDefaults({
    orgName: "exm",
    projectName: name,
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    entry: path.resolve(
      process.cwd(),
      `src/index.ts`
    ),
  });
};

module.exports = config;

const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const path = require("path");

const config = (package, webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "exm",
    projectName: package.name.split("/")[1],
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    entry: path.resolve(
      process.cwd(),
      `src/index.tsx`
    ),
    // modify the webpack config however you'd like to by adding to this object
  });
};

module.exports = config;

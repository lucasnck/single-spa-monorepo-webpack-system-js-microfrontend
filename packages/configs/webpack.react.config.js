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
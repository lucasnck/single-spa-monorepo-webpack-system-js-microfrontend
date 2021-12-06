const { merge } = require("webpack-merge");
const config = require("@exm/configs/webpack.react.config");
const package = require('./package.json');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = config(package, webpackConfigEnv, argv);

  return merge(defaultConfig, {
    externals: {
      "@exm/settings": "@exm/settings",
    },
  });
};

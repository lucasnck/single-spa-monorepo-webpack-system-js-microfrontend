const config = require("@exm/configs/webpack.react.config");
const package = require('./package.json');

module.exports = (webpackConfigEnv, argv) => {
  return config(package, webpackConfigEnv, argv)
};

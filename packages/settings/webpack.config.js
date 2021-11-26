const config = require("@exm/configs/webpack.config");
const package = require('./package.json');

module.exports = (webpackConfigEnv, argv) => {
  return config(package, webpackConfigEnv, argv);
};
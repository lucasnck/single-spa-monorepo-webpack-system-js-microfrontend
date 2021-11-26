const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const config = require("@exm/configs/webpack.config");
const package = require('./package.json');

module.exports = (webpackConfigEnv, argv) => {

  const defaultConfig = config(package, webpackConfigEnv, argv);

  return merge(defaultConfig, {
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName: defaultConfig.orgName,
        },
      }),
      new CopyPlugin({
        patterns: [
          { from: "./src/exm-import-map.json", to: "dist" },
        ],
      }),
    ],
    externals: {
      "@exm/routes": '@exm/routes'
    },
  });
};
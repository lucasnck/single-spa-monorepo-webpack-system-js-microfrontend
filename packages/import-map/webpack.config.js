const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: './src/exm-import-map.json',
  output: {
    filename: '[name].json',
    path: path.resolve(process.cwd(), "dist"),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src/exm-import-map.json", to: "dist" },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, '/dist/exm-import-map.json'),
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    client: {
      webSocketURL: {
        hostname: "localhost",
      },
    },
  }
};
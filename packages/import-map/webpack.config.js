const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: './src/exm-import-map.json',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].json'
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src/exm-import-map.json", to: "dist" },
      ],
    }),
  ],
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }
};
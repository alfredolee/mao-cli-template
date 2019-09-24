const webpackMerge = require("webpack-merge");

const baseConfig = require("./webpack.base.js");
const devConfig = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: "../dist",
    hot: true,
    stats: "errors-only"
  }
};

module.exports = webpackMerge(baseConfig, devConfig);

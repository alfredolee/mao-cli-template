const webpackMerge = require("webpack-merge");
const createBaseConfig = require("./webpack.base.js");

const devConfig = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "../dist",
    open: true,
    hot: true,
    hotOnly: true,
    before(app) {
      app.get("/data", function(req, res) {
        res.json({ data: "hello" });
      });
    }
  }
};

module.exports = env => webpackMerge(createBaseConfig(env), devConfig);

const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    lib: ["vue", "vue-router", "vuex"]
  },
  output: {
    filename: "[name]_[chunkhash].dll.js",
    path: path.join(__dirname, "../public/lib"),
    library: "[name]_[chunkhash]"
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]_[chunkhash]",
      path: path.join(__dirname, "../public/lib/[name]_manifest.json")
    })
  ]
};

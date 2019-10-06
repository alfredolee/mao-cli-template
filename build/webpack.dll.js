const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    lib: ["vue", "vue-router", "vuex"],
  },
  output: {
    filename: "[name]_[chunkhash:8].dll.js",
    path: path.join(__dirname, "../dll"),
    library: "[name]_[chunkhash:8]",
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]_[chunkhash:8]",
      path: path.join(__dirname, "../dll/[name]_manifest.json"),
    }),
  ],
};

const webpackMerge = require("webpack-merge");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const baseConfig = require("./webpack.base.js");
const ssrConfig = {
  mode: "production",
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "all",
          minChunks: 2
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: "ignore-loader"
      },
      {
        test: /\.scss$/,
        use: "ignore-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: "vue",
          entry: "https://cdn.bootcss.com/vue/2.6.10/vue.min.js",
          global: "Vue"
        }
      ]
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano")
    })
  ]
};

module.exports = webpackMerge(baseConfig, ssrConfig);

const webpackMerge = require("webpack-merge");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const cssnano = require("cssnano");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const libraryManifest = require("../public/lib/lib_manifest.json");
const createBaseConfig = require("./webpack.base.js");

// const smp = new SpeedMeasureWebpackPlugin();
const PATHS = {
  src: path.join(__dirname, "../src")
};

const prodConfig = {
  mode: "production",
  devtool: "cheap-module-source-map",
  output: {
    filename: "[name]_[contenthash:8].js",
    chunkFilename: "[name]_[contenthash:8].chunk.js",
    path: path.resolve(__dirname, "../dist")
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        parallel: false,
        cache: true
      })
    ],
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        venders: false,
        default: false,
        commons: {
          name: "commons",
          chunks: "all",
          reuseExistingChunk: true,
          minChunks: 2
        },
        test: {
          test(module, chunks) {
            return module.type === "javascript/auto";
          },
          name: "test",
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, "../public/lib/*.js"),
        to: path.resolve(__dirname, "../dist/[name].js")
      }
    ]),
    // new BundleAnalyzerPlugin(),
    new HardSourceWebpackPlugin(), // 开启之后即使chunk对应文件没有变化，重新构建chunkhash也会变化
    /**
     * TODO: 在devtool: "cheap-module-source-map"模式下
     *       因为使用 DllReferencePlugin导致 *.js.map 文件无法生成
     */
    new webpack.DllReferencePlugin({
      manifest: libraryManifest
    }),
    /**
     * TODO: 因为使用OptimizeCssAssetsWebpackPlugin导致 *.css.map 文件无法生成
     */
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano
    }),
    /**
     * TODO: PurgecssPlugin 会删除对 body或者html的样式编写
     */
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
    })
  ],
  resolve: {
    //   alias: {
    //     vue: path.resolve(__dirname, "../node_modules/vue/dist/vue.min.js"),
    //     "vue-router": path.resolve(
    //       __dirname,
    //       "../node_modules/vue-router/dist/vue-router.min.js"
    //     )
    //   },
    modules: [path.resolve(__dirname, "../node_modules")],
    extensions: [".js", ".jsx"]
    // mainFields: ["main"]
  }
};

module.exports = env => webpackMerge(createBaseConfig(env), prodConfig);

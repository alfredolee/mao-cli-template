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

const baseConfig = require("./webpack.base.js");
const smp = new SpeedMeasureWebpackPlugin();
const PATHS = {
  src: path.join(__dirname, "../src")
};

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name]_[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve("src"),
        use: [
          {
            loader: "thread-loader",
            options: {
              worker: 3
            }
          },
          "babel-loader?cacheDirectory=true"
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
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
        commons: {
          name: "commons",
          chunks: "all",
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new HardSourceWebpackPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require("../public/library/library_manifest.json")
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano")
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
    })
  ]
  // resolve: {
  //   alias: {
  //     vue: path.resolve(__dirname, "../node_modules/vue/dist/vue.min.js"),
  //     "vue-router": path.resolve(
  //       __dirname,
  //       "../node_modules/vue-router/dist/vue-router.min.js"
  //     )
  //   },
  //   modules: [path.resolve(__dirname, "node_modules")],
  //   extensions: [".js"]
  //   mainFields: ["main"]
  // }
};

module.exports = webpackMerge(baseConfig, prodConfig);

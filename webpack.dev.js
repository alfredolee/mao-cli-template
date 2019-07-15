const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "devlopment",
  entry: {
    index: "./src/index.js",
    data: "./src/data.js"
  },
  output: {
    filename: "[name][chunkhash:8].js",
    // chunkFilename: "[name].js",
    path: __dirname + "/dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // modules: true,
              importLoaders: 1 // import语法导入的scss同样经过之前1个loader的处理
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // modules: true,
              importLoaders: 1
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]-[hash].[ext]",
            outputPath: "images/",
            limit: 8192
          }
        }
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "fonts/"
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: "./dist",
    hot: true
  }
};

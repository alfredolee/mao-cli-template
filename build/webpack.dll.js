const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    library: ['vue', 'vue-router'],
  },
  output: {
    filename: '[name]_[chunkhash].dll.js',
    path: path.join(__dirname, '../public/library'),
    library: '[name]_[chunkhash]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[chunkhash]',
      path: path.join(__dirname, '../public/library/[name]_manifest.json'),
    }),
  ],
};

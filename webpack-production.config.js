var webpack = require('webpack');
var config = require('./webpack.config');

config.plugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
];

module.exports = config;

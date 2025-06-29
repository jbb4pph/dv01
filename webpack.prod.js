const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  //devtool: 'source-map',
  output: {
    filename: 'dv.b.js',
    path: path.resolve(__dirname, 'dist/htdocs/'),
    publicPath: "/"
  }
});


var path = require('path');
var webpack = require("webpack");

var cssName = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';

var jsName = 'bundle.js';

var BUILD_DIR = path.resolve(__dirname, 'public');

var config = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, './jsx/client.jsx')
  ],
  output: {
      path: BUILD_DIR,
      filename: 'bundle.js'
  },
  resolve: {
      extensions: ['.js', '.jsx', '.css']
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config;

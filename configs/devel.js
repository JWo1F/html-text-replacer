var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: "./app/entry.ts",
  context: path.resolve(__dirname, '..'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    library: 'html-text-replacer',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, '../app')],
        loader: 'ts-loader'
      }
    ]
  }
};
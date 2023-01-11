require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: process.env.WEBPACK_MODE || 'development',
  entry: path.join(__dirname, '/client/src', 'index.jsx'),
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
    modules: ['src', 'node_modules'],
    fallback: {
      fs: false,
      os: false,
    },
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-object-assign'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        loader: 'webpack-remove-debug',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        PORT: JSON.stringify(process.env.PORT),
      },
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
    }),
  ],
};
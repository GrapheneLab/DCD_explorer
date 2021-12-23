const { resolve } = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');

const { config } = require('./common');

const DEV_DIST = resolve(__dirname, '..', 'dist');

module.exports = merge(config, {
  profile: false,
  devtool: 'inline-source-map',

  output: {
    path: DEV_DIST,
    pathinfo: true,
    filename: '[name].dev.js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin()
  ],

  devServer: {
    contentBase: resolve(__dirname, '..', 'public'),
    compress: true,
    hot: true,
    noInfo: true,
    historyApiFallback: {
        disableDotRule: true
    },
    overlay: {
      warning: false,
      errors: true,
    },
  },
})

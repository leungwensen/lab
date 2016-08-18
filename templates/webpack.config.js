const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    'dist/index': path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname),
    publicPath: '/',
    filename: '[name].js'
  },
  alias: {},
  resolveLoader: {},
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        exclude: /locale/,
        query: {
          presets: [
            'es2015',
            'react',
            'stage-0',
          ]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i, // images
        loader: 'url?name=[path][name].[ext]'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/, // font files
        loader: 'url?name=[path][name].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
    ]
  },
  externals: {
    'echarts': 'echarts',
    'incremental-dom': 'IncrementalDOM',
    'jquery': 'jQuery',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'underscore': '_',
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    // new webpack.optimize.DedupePlugin(),
  ],
};


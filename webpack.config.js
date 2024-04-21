const path = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PRODUCTION = 'production';
const DEVELOPMENT = 'development';
const isProduction = process.env.NODE_ENV === PRODUCTION;
const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: './src/index.js',
  output: {
      path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    open: true,
    host: 'localhost'
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: 'index.html',
    }),
    new MiniCssExtractPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: !isProduction,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: !isProduction,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader'],
      }
    ]
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
      config.mode = 'development';
  }
  return config;
}

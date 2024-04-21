const path = require('path');
const { EnvironmentPlugin, DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = 'production';
const DEVELOPMENT = 'development';
const isProduction = process.env.NODE_ENV === PRODUCTION;

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
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: !isProduction,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: !isProduction,
    }),
  ]
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
      config.mode = 'development';
  }
  return config;
}

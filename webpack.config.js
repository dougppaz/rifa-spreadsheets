const path = require('path')
const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
require('dotenv').config()

const PRODUCTION = 'production'
const DEVELOPMENT = 'development'
const isProduction = process.env.NODE_ENV === PRODUCTION
const stylesHandler = MiniCssExtractPlugin.loader

const config = {
  entry: {
    'rifa-spreadsheets': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? '[name].[fullhash].js' : '[name].js'
  },
  devServer: {
    open: true,
    host: 'localhost'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      title: process.env.TITLE || 'Rifa Online'
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[contenthash].css' : '[name].css'
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: !isProduction,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: !isProduction,
      'process.env.SCRIPT_GOOGLE_URL': JSON.stringify(process.env.SCRIPT_GOOGLE_URL),
      'process.env.LIST_RIFAS_URL': JSON.stringify(process.env.LIST_RIFAS_URL)
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sass|less|css|scss)$/,
        use: [stylesHandler, 'css-loader', 'sass-loader']
      }
    ]
  }
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'
  } else {
    config.mode = 'development'
  }
  return config
}

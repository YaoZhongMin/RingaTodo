(function () {
  'use strict'

  // 引入各种插件和方法
  const path = require('path')

  const HTMLPlugin = require('html-webpack-plugin')

  const webpack = require('webpack')

  const merge = require('webpack-merge')

  const ExtractPlugin = require('extract-text-webpack-plugin') // 这个插件用来打包css文件

  const baseConfig = require('./webpack.config.base')

  const isDev = process.env.NODE_ENV === 'development' // 判断是处在开发环境还是生产环境

  const defaultPlugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]

  const devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    hot: true // 设置热加载，不刷新页面，只更新改变的组件
    // open: true  设置在使用 npm run xxx 的时候会自动帮你把这个网页打开
  }

  let config

  if (isDev) {
    config = merge(baseConfig, {
      devtool: '#cheap-module-eval-source-map', //  由于我们现在用的是.vue的开发模式，且很多es6代码 这种代码在很多浏览器内是经过编译的，比较难读，devtool的配置可以起到映射的作用，让我们在浏览器调试的时候看到的是我们开发时写的代码，方便我们快速的定位到错误
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'vue-style-loader',
              'css-loader'
            ]
          }
        ]
      },
      devServer: devServer,
      plugins: defaultPlugins.concat([ // 配置热加载
        new webpack.HotModuleReplacementPlugin()
      ])
    })
  } else {
    config = merge(baseConfig, {
      entry: {
        app: path.join(__dirname, '../client/index.js')
      },
      output: {
        filename: '[name].[chunkhash:8].js'
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ExtractPlugin.extract({
              fallback: 'vue-style-loader',
              use: [
                'css-loader'
              ]
            })
          }
        ]
      },
      optimization: { // 将js文件单独打包
        splitChunks: {
          chunks: 'all'
        },
        runtimeChunk: true
      },
      plugins: defaultPlugins.concat([
        new ExtractPlugin('styles.[chunkhash:8].css')
      ])
    })
  }

  module.exports = config
})()

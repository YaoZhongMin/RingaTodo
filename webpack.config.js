'use strict'

//引入各种插件和方法
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),//入口
    output: {
        filename: 'bundle[hash:8].js',
        path:path.join(__dirname, 'dist')//出口
    },
    mode: process.env.NODE_ENV || 'production',  //development || production
    module: {
        rules:[
            {//设置vue文件交给vue-loader处理
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.jsx$/,
                loader:'babel-loader'
            },
            
            {//设置图片文件交给url-loader处理
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name]-aaa.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env' : {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin(),
    ]
}

if (isDev){
    config.module.rules.push(
        {//设置样式文件交给css-loader处理 （style-loader是css-loader的依赖）
            test:/\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        },
    )
    config.devtool = '#cheap-module-eval-source-map'  //由于我们现在用的是.vue的开发模式，且很多es6代码 这种代码在很多浏览器内是经过编译的，比较难读，devtool的配置可以起到映射的作用，让我们在浏览器调试的时候看到的是我们开发时写的代码，方便我们快速的定位到错误
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay:{
            errors : true,
        },
        hot:true//设置热加载，不刷新页面，只更新改变的组件
        //open: true  设置在使用 npm run xxx 的时候会自动帮你把这个网页打开
    }
    config.plugins.push( //配置热加载
        new webpack.HotModuleReplacementPlugin()
        // new webpack.NoEmitOnErrorsPlugin()
    )
}else{
    config.entry = {
        app: path.join(__dirname, 'src/index.js')
        //vendor: ['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push(
        {//设置样式文件交给css-loader处理 （style-loader是css-loader的依赖）
            test:/\.css$/,
            use: ExtractPlugin.extract({
                fallback: 'style-loader',
                use:[
                    'css-loader'
                ]
            })
        }
    )
    config.optimization.push({
        splitChunks:{
            chunks:'all'
        },
        runtimeChunk:true
    })
    config.plugins.push(
        new ExtractPlugin('styles.[name].css'),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:'vendor'
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:'runtime'
        // })
    )
}

module.exports = config
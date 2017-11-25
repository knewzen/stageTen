//导入路径模块
var path =require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack')

module.exports = {
    //第一部分 入口和出口的设置
    // entry:'./src/main.js',
    entry:{
        app:'./src/main.js',
        vendor:['vue']
    },
    output:{
        path:path.join(__dirname+'/dist'),
        filename:'bundle.js'
    },
    //第二部分,加载器的添加
    module:{
        rules:[
            //第一个加载器,解析.vue文件的vue-loader
            {
                test:/\.vue$/,
                use:'vue-loader'
            },
            //第二个加载器,解析css的css-loader
            // {
            //     test: /\.css$/,
            //     use: [ 'style-loader', 'css-loader' ]
            // },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                })
            }
            
        ]
    },

    //第三部分 插件
    plugins:[
         //需要安装并引入
    //自动生成html文件和指明需要依赖的相关css和js文件
    new HtmlWebpackPlugin({
        //指定以哪个作为模板进行生成
        template: './src/index.html',
        htmlWebpackPlugin: {
          "files": {//指明需要依赖的相关css和js文件
            "css": ["app.css"],
            "js": ["bundle.js",'vendor.js']
          }
        },
         //webpack -p压缩代码
        // 压缩 情怀至上J
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        }
    }),

    //将css从合并后的bundle.js文件中拆分出来
    new ExtractTextPlugin('app.css'),

    //提取公共js代码
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor',filename:'vendor.js'}),
    ]
}
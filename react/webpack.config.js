//webpack  配置文件

console.log("webpack")


//导入模块
var path=require("path");//node内置模块（fs,ftp,http,url,path...） 无需安装
var htmlWebpackPlugin=require("html-webpack-plugin");//处理html文件  需安装： cnpm i html-webpack-plugin -D 
var openBrowserWebpackPlugin=require("open-browser-webpack-plugin");// 自动打开浏览器     cnpm i open-browser-webpack-plugin -D
var extractTextPlugin=require("extract-text-webpack-plugin");//抽离样式


var webpack=require("webpack")

module.exports={
    entry:["./src/main.js"],//入口    数组：可能后期存在多个入口
    output:{ //出口
        path:path.resolve(__dirname,"dist"),//输出打包到   _dirname:根路径  里面的dist文件中
        filename:"js/[name].[hash:8].js",//通过加密得到长度为8的字符串，为阻止文件缓存 
        publicPath:"",//文件的公共路径
    },
    devtool:"source-map",//方便在线调试
    resolve:{
        alias:{//别名  @===>src
            "@":path.resolve("src"),
            "~":path.resolve("src/scripts")
        }
    },

    module:{
        rules:[
            {//打包js或jsx文件
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:["babel-loader"]
            },
            {//图片打包 
                test:/\.(png|jpg|gif|svg|woff|woff2|eto|ttf)$/,
                use:[{
                    loader:"url-loader",
                    options:{
                        limit:8192,
                        name:"imgs/[name].[hash:8].[ext]"
                    }
                }]
            },
            {//样式打包  css  scss less
                test:/\.(css|less)$/,
                use:extractTextPlugin.extract({
                    fallback:"style-loader",//把node字符串代码转换为style节点
                    use:[
                        "css-loader",
                        {
                            loader:"postcss-loader",//css代码转化
                            options:{
                                plugins:function(){
                                    return [
                                        require("cssgrace"),//代码美化
                                        require("autoprefixer"),//自动补全
                                        require("postcss-px2rem-exclude")(
                                            {
                                                remUnit:100,    //适配
                                                exclude:/antd-mobile/i  //排除UI库适配 
                                            }
                                        )
                                    ]
                                }
                            }
                        },
                        "less-loader"
                    ]
                })
            }
            // {
            //     test:/\.(css|less)$/,
            //     use:[
            //         "style-loader",
            //         "css-loader",
            //         {
            //             loader:"postcss-loader",//css代码转化
            //             options:{
            //                 plugins:function(){
            //                     return [
            //                         require("cssgrace"),//代码美化
            //                         require("autoprefixer"),//自动补全
            //                         require("postcss-px2rem-exclude")(
            //                             {
            //                                 remUnit:100,    //适配
            //                                 exclude:/antd-mobile/i  //排除UI库适配 
            //                             }
            //                         )
            //                     ]
            //                 }
            //             }
            //         },
            //         "less-loader"
            //     ]
            // }
        ]
    },




    devServer:{  //配置 服务器 webpack-dev-server开发使用
        //打包启服务
        contentBase:path.join(__dirname,"dist"),//启服务，作用于dist
        host:"0.0.0.0",
        port:8000,
        compress:true,//压缩
        hot:true,
        inline:true,
        // open:true,//与host:"0.0.0.0"冲突
        publicPath:"",
        proxy:{//代理
            "/apir":{
                target:"http://localhost:1503/",
                changeOrigin:true
            },

            "/vue":{
                target:"http://localhost:1503/",
                changeOrigin:true
            }
        }
    },


    //打包html文件
    plugins:[//声明使用的插件

        new openBrowserWebpackPlugin({url:"localhost:8000"}),

        new extractTextPlugin({   //！！！！！！须有该项声明，不然会报错   样式
            filename:"css/app.[hash:8].css",
            allChunks:true ,  // 打包所有样式数据
            disable:false  // 才样式抽离  
        }),

        new htmlWebpackPlugin({
            template:"./public/index.html",
            inject:true  //自动注入打包的css和js文件
        }),

        //自动引入  全局声明  创建组件时无需声明  import React from "react"
        new webpack.ProvidePlugin({
            React:"React",
            Component:['react','Component']
        })




    ]



}
const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config()
const ENV = process.env.APP_ENV;

const isProd = ENV === 'prod';

function setDevTool() {  // function to set dev-tool depending on environment
    if (isProd) {
        return 'inline-source-map';
    } else {
        return 'source-map';
    }
}

const config = {
    mode: 'development',
    entry: path.resolve(__dirname, "src", "app", "index.js"),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader?name=./static-component/[name].[ext]',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        sassOptions: {
                            data: '@import "variables";',
                            includePaths: [path.resolve(__dirname, "./src/scss")] },
                    },
                }]
            },/*{
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [
                    /node_modules/
                ]
            },*/
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader?name=./fonts/[name].[ext]'
                    }
                ]
            },{
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader?name=./img/[name].[ext]'
                    }
                ]
            },

        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname) + "/src/public/index.html"
        })
    ],
    devServer: {
        host: 'localhost',
        port: 8080,
        contentBase: path.join(__dirname, "dist"),
        // open: true
        publicPath: '/',

    },
    devtool: setDevTool(),

}

if (isProd) {
    config.plugins.push(
        new UglifyJSPlugin(),
        new CopyWebpackPlugin([{
            from: __dirname + '/src/public'
        }])
    );
};

module.exports = config;
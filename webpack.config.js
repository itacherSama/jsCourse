const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }/* , {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            } */, {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ],
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        contentBase: path.join(__dirname, "dist"),
        hot: true,
        open: true,
        openPage: ''
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin(),
        new CleanWebpackPlugin(),
    ]
}

const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {    
    mode: 'production',
    entry: ['@babel/polyfill', '/js/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 4200
    },
    devtool: 'source-map',
    plugins: [
        new HTMLWebpackPlugin({
                template: './index.html'
            }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'index.css'
            }),
        new ESLintPlugin()
    ],
    module: { 
        rules: [
            {
                test: /\.css$/,
                use:[MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                  }
                }
            }
        ]
    }
} 
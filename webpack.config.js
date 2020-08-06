const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueloaderPlugin=require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
module.exports = {
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/static'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            

        ],
    },
    plugins: [
        new HtmlWebpackPlugin({template: './public/index.html'}),
        new VueloaderPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: './public/static',
                to: './static'
            }]
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                assetsPublicPath: '/',
                assetsSubDirectory: 'static',
            }
        })
    ],
    devServer: {
        port: '1234'
    }
}
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueloaderPlugin=require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
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
        new VueloaderPlugin()
    ],
    devServer: {
        port: '1234'
    }
}
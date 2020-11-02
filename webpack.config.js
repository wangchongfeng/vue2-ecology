const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueloaderPlugin=require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const https = require('https')
class FailPlugin {
    constructor(compiler) {
      this.compiler = compiler
    }

    apply(compiler) {
      compiler.hooks.failed.tap('fail', (args) => {
        console.log('失败')
      })
      compiler.hooks.compile.tap('MyPlugin', params => {
        console.log('以同步方式触及 compile 钩子。')
      })
      compiler.hooks.done.tap('MyPlugin1', params => {
          if (params.compilation.errors.length > 0) {
            https.get('https://baidu.com/', res => {
                let data = '';

                // called when a data chunk is received.
                res.on('data', (chunk) => {
                    data += chunk;
                });

                // called when the complete response is received.
                res.on('end', () => {
                    console.log(data);
                });
            })
            // https.request({
            //     methods: 'get',
            // },(res) => {

            // })
          }
          return true
        console.log('errors:', params.compilation.errors.length)
        console.log('warnings:',params.compilation.warnings.length)
      })
    }
  }
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/'
    },
    resolveLoader: {
        modules: ['./loaders', 'node_modules' ]
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
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
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
        }),
        // new FailPlugin()
    ],
    devServer: {
        port: '1234'
    }
}
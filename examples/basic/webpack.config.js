var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');

console.log(process.cwd())

module.exports = {
    entry: {
        app: path.resolve(ROOT_PATH, 'index.js'),
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
    },
    //启动dev source map，出错以后就会采用source-map的形式直接显示你出错代码的位置。
    devtool: 'eval-source-map',
    //enable dev server
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        port: 9003
    },
    module: {
        loaders: [
            {
                test: /\.js|.jsx$/,
                loaders: ['babel'],
                exclude: /node_modules/
            }, {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=./iconfont/[name].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)/,
                loader: 'url-loader?limit=999999'
            }, {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        new HtmlwebpackPlugin({
            title: 'Hello Mobile app',
            template: path.resolve(TEM_PATH, 'index.html')
        }),
        //把入口文件里面的数组打包成verdors.js
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ]
}

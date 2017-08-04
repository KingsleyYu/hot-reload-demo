

var webpack = require('webpack');
var path = require('path');
var extend = require('extend');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')



module.exports = {
    devtool: 'source-map',
    entry: {
        index: [
            "webpack-dev-server/client?http://localhost:9003",
            "webpack/hot/only-dev-server",
            './src/index.js'
        ]
    },
    output: {
        publicPath: '/assets',
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {

        },
        extensions: ['', '.js', '.less', '.jsx', '.json']
    },
    module: {
        loaders: [{
            test: /\.js|.jsx$/,
            loaders: ['react-hot', 'babel'],
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            loaders: ["style-loader", "css-loader", "less-loader"]
        }, {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: 'file-loader?name=./iconfont/[name].[ext]'
        },
        {
            test: /\.(jpe?g|png|gif|svg|ico)/,
            loader: 'url-loader?limit=999999'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        },
        {
            test: /\.md$/,
            loader: 'babel!markdown-it-gfs-loader'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin({
            title: 'Hot Reload Demo',
            template: 'src/index.html'
        })
    ]
}    
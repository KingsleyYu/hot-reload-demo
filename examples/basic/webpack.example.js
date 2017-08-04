const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackDevServer = require('webpack-dev-server');
const devPort = 9001


const env ='development';
process.env.NODE_ENV = process.env.NODE_ENV || 'env';

const sourceDir = path.resolve(__dirname, '../node_modules/kfs-doc/src');


let webpackConfig = {
    entry: {
        index: [path.resolve(sourceDir, `template/react/index.js`)]
    },
    output: {
        path: path.join(process.cwd() + '/examples/basic/doc/1.0.0'),
        publicPath: '/doc/1.0.0',
        filename: '[name].bundle.js',
        chunkFilename: '[name].js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.less'],
        alias: {
            docConfig: path.join(__dirname, 'doc', '1.0.0', 'doc'),
        },
    },
    module: {
        loaders: [{
            test: /\.js|.jsx$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        }, {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: 'file-loader?name=./iconfont/[name].[ext]'
        },
        {
            test: /\.(jpe?g|png|gif|svg|ico)/,
            loader: 'url-loader?limit=999999'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Demo',
            template: path.join(sourceDir, 'index.html'),
            inject: true,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env),
            },
        }),
    ],
    performance: {
        hints: false,
    },
}


module.exports=webpackConfig

// // 初始化一个webpack-dev-server
// new webpackDevServer(compiler, {
//     publicPath: '/' + config.outdir,
//     historyApiFallback: false,
//     stats: {
//         colors: true
//     }
// }).listen(devPort, 'localhost', function (error) {
//     console.log(error)
// });
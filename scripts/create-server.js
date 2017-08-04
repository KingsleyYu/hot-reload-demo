'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const merge = require('webpack-merge');
const makeWebpackConfig = require('./make-webpack-config');


module.exports = function createServer(config, port, env) {
    const webpackConfig = makeWebpackConfig(config, env);
    const webpackDevServerConfig = merge(webpackConfig.devServer, {
        noInfo: true,
        compress: true,
        clientLogLevel: 'none',
        hot: true,
        watchOptions: {
            ignored: /node_modules/,
        },
        contentBase: config.outdit,
        stats: webpackConfig.stats || {},
    });

    //compose webpack entry
    webpackConfig
        .entry
        .index
        .unshift(`webpack-dev-server/client?http://localhost:${port}/`, 'webpack/hot/dev-server');


    const compiler = webpack(webpackConfig);
    const devServer = new WebpackDevServer(compiler, webpackDevServerConfig);

    // User defined customizations
    // if (config.configureServer) {
    //     config.configureServer(devServer.app, env);
    // }

    return { app: devServer, compiler };
};

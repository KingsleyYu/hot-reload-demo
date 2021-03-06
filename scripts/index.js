'use strict';


const build = require('./build');
const server = require('./server');
const makeWebpackConfig = require('./make-webpack-config');
const getConfig = require('./config');

/**
 * Initialize GFS DOC API.
 *
 * @param {object} [config] GFS DOC config.
 * @returns {object} API.
 */
module.exports = function(config) {
	config = getConfig(config);

	return {
		/**
		 * Build style guide.
		 *
		 * @param {Function} callback callback(err, config, stats).
		 * @return {Compiler} Webpack Compiler instance.
		 */
		build(callback) {
			return build(config, (err, stats) => callback(err, config, stats));
		},

		/**
		 * Start gfs doc guide dev server.
		 *
		 * @param {Function} callback callback(err, config).
		 * @return {Compiler} Webpack Compiler instance.
		 */
		server(callback) {
			return server(config, err => callback(err, config));
		},

		/**
		 * Return GfsDoc Webpack config.
		 *
		 * @param {string} [env=production] 'production' or 'development'.
		 * @return {object}
		 */
		makeWebpackConfig(env) {
			return makeWebpackConfig(config, env || 'production');
		},
	};
};

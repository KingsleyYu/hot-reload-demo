'use strict';

/**
 * Read, parse and validate config file or passed config.
 *
 * @param {object|string} [config] All config options or config file name or nothing.
 * @returns {object}
 */
const fs = require('fs');
const path = require('path');
const findup = require('findup');
const isString = require('lodash/isString');
const merge = require('lodash/merge');

const CONFIG_FILENAME = 'doc.config.js';
// const ROOT_PATH=process.cwd();
const ROOT_PATH = path.join(process.cwd(), 'examples', 'basic');

const PKG = require(path.join(ROOT_PATH, 'package.json'));



function getConfig(config) {
    config = config || {};

    let configFilepath;
    if (isString(config)) {
        configFilepath = path.resolve(ROOT_PATH, config);
        if (!fs.existsSync(configFilepath)) {
            console.error('no doc.config.js file found...')
        }
        config = {};
    } else {
        configFilepath = findConfigFile();
    }

    if (configFilepath) {
        config = require(configFilepath);

        config.path = config.paths[0];
        config.type = config.type || "react";
        config.rootOutDir = config.outdir || "doc/";
        config.outdir = path.join(config.outdir || 'doc', PKG.version, '/');
        config.project.version = PKG.version;
    }

    const configDir = configFilepath ? path.dirname(configFilepath) : process.cwd();

    const mergedConfig = merge({}, config);

    return mergedConfig;
}

/**
 * Try to find config file up the file tree.
 *
 * @return {string|boolean} Config absolute file path.
 */
function findConfigFile() {
    let configDir;
    try {
        configDir = findup.sync(ROOT_PATH, CONFIG_FILENAME);
    } catch (exception) {
        return false;
    }

    return path.join(configDir, CONFIG_FILENAME);
}

module.exports = getConfig;
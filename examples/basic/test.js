
const Y = require('yuidocjs')
const chokidar = require('chokidar');
const minimist = require('minimist');

const getConfig = require('../../scripts/config');
const server = require('../../scripts/server');
const docBuild = require('../../scripts/doc');

const logger = Y.log;

const argv = minimist(process.argv.slice(2));
const command = argv._[0];



let config;
try {
    config = getConfig(argv.config);
} catch (err) {
    console.log('no doc config file found...')
}


docBuild.build(config, () => {
    const compiler = server(config, err => {
        if (err) {
            console.error(err);
        } else {
            const isHttps = compiler.options.devServer && compiler.options.devServer.https;

            // chokidar.watch(currentDir).on('change', (event, p) => {
            //     if (path.extname(p) !== ".md") {
            //         doc.build(config);
            //     }
            // })
            logger(
                'doc guide server started at:\n' +
                (isHttps ? 'https' : 'http') +
                '://' +
                config.serverHost +
                ':' +
                config.serverPort
            );
        }
    });
})

// console.log(compiler);
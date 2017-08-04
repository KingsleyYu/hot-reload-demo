'use strict';

const Y = require('yuidocjs');
const fs = require("fs");
const path = require("path");

// const ROOT_PATH=process.cwd();
const ROOT_PATH = path.join(process.cwd(), 'examples', 'basic');


exports.build = function (config, callback) {    
    if (!fs.existsSync(config.rootOutDir)) {
        fs.mkdirSync(config.rootOutDir)
    }

    if (!fs.existsSync(config.outdir)) {
        fs.mkdirSync(config.outdir)
    }

    buildDoc(config,callback);

    function buildDoc(options,callback) {
        var json;
        
        try {
            json = (new Y.YUIDoc(options)).run();
        } catch (e) {
            console.log(e);
            return;
        }

        options = Y.Project.mix(json, options);

        var metaData = buildDocConfig(Object.assign({}, json));

        metaData.path=options.paths[0];
        metaData.exclude=options.exclude;

        fs.writeFileSync(path.join(ROOT_PATH,options.outdir, 'doc.js'), "export default \r\n" + JSON.stringify(metaData));

        callback&&callback();
    }

    function buildDocConfig(data) {
        var items = [], submodules = [], module, subModule, moduleName, subModuleName;
        Y.each(data.modules, function (item) {
            item.name && items.push({
                type: 'module',
                name: item.name
            });
        });

        Y.each(data.classes, function (item) {
            item.name && items.push({
                type: 'class',
                name: item.name
            });
        })

        data.classitems.forEach(function (item) {
            item.name && items.push({
                type: item.itemtype,
                className: item['class'],
                name: item.name
            });
        })

        data.filterItems = items;

        //group the classes by module and submodule 
        Y.each(data.modules, function (i, oModuleKey) {
            module = data.modules[oModuleKey];
            if (!module.is_submodule) {
                submodules = [];
                Y.each(module.submodules, function (j, oSubModuleKey) {
                    submodules.push({
                        name: oSubModuleKey,
                        classes: getClassesBySubmodule(data.classes, module.name, oSubModuleKey)
                    })
                })
                // module.submodules = submodules;
                submodules.sort(Y.DocBuilder.prototype.nameSort);
                module.submodules = submodules;
            }
        })

        return data;
    }

    /**
     * 根据module和submodule 分组classes
     * @param {*} data 
     * @param {*} module 
     * @param {*} submodule 
     */
    function getClassesBySubmodule(data, module, submodule) {
        var c_array = [];

        Y.each(data, function (i, o) {
            if (data[o].module === module && data[o].submodule === submodule) {
                c_array.push(data[o])
            }
        })

        return c_array
    }
};
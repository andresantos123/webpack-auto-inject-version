/// <reference path='../../typings/index.d.ts' />

'use strict';

/**
 * Inject version number into HTML
 * - done by parsing html file,
 *   > replace: <{version}>
 */
class InjectIntoHtml{


    constructor(private context) {}

    apply() {
        this.context.compiler.plugin('emit', (compilation, cb) => {
            for ( var basename in compilation.assets ) {
                console.log(basename);
                if(basename.indexOf('.html') >= 0 ) {
                    console.log("achou html");
                    let asset = compilation.assets[basename];
                    let modFile = asset.source().replace(/(\<\{version\}\>)/g, this.context.version);
                    asset.source = () => modFile;
                }
            }
            cb();
        });
        return new Promise((resolve, reject) => { resolve(); })
    }
}

module.exports = InjectIntoHtml;
'use strict';


const UglifyJS = require('uglify-js');
const Promise  = require('bluebird');


module.exports = function (context) {
  return Promise.resolve().then(() => {
    let result = UglifyJS.minify(context.asset.source, {
      fromString: true
    });

    // Special case for "browser-pack/prelude.js": if source will be empty after
    // compression - skip compression, because file may be included by macros.
    if (result.code !== '') {
      context.asset.source = result.code;
    }
  });
};

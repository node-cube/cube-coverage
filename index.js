'use strict';
var path = require('path');
const istanbulMiddleware = require('istanbul-middleware');
const core = require('istanbul-middleware/lib/core');
const _ = require('lodash');

let defaultConfig = {
  ignore: ['/node_modules/']
};

function IstanbulProcessor(cube, cfg) {
  this.cube = cube;
  this.config = _.merge(defaultConfig, cfg || {});
  var config = cube.config;
  istanbulMiddleware.hookLoader(config.root, {verbose: true});
}
IstanbulProcessor.type = 'script';
IstanbulProcessor.ext = '.js';

IstanbulProcessor.prototype.process = function (data, callback) {
  var code = data.code;
  var config = this.cube.config;
  var file = path.join(config.root, data.realPath);

  const isIgnore = _.some(this.config.ignore, (rule) => {
    return file.toString().indexOf(rule) !== -1;
  });

  if (isIgnore) return callback(null, data);

  let codeRes = core.getInstrumenter().instrumentSync(code, file);
  data.code = codeRes;
  callback(null, data);
};

module.exports = IstanbulProcessor;

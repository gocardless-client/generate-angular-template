'use strict';

var util = require('util');

var TEMPLATE = 'angular.module(\'%s\', []).run(function($templateCache) {\n' +
    '  $templateCache.put(\'%s\',\n    \'%s\');\n' +
    '});\n';

var SINGLE_MODULE_TPL = '(function(module) {\n' +
    'try {\n' +
    '  module = angular.module(\'%s\');\n' +
    '} catch (e) {\n' +
    '  module = angular.module(\'%s\', []);\n' +
    '}\n' +
    'module.run(function($templateCache) {\n' +
    '  $templateCache.put(\'%s\',\n    \'%s\');\n' +
    '});\n' +
    '})();\n';

/**
 * Escape string
 * @param  {String} content
 * @return {String}
 */
var escapeContent = function(content) {
  return content
    .replace(/\\/g, '\\\\')
    .replace(/'/g, '\\\'')
    .replace(/\r?\n/g, '\\n\' +\n    \'');
};

/**
 * Generate angular templateCache from string
 * @param  {String} options
 * @return {String}
 */
function generateAngularTemplate(options) {
  if (options.moduleName) {
    return(util.format(SINGLE_MODULE_TPL,
      options.moduleName,
      options.moduleName,
      options.htmlPath,
      escapeContent(options.content)));
  } else {
    return(util.format(TEMPLATE,
      options.htmlPath,
      options.htmlPath,
      escapeContent(options.content)));
  }
}

module.exports = generateAngularTemplate;

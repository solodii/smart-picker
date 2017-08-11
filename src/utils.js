'use strict';

module.exports.isObject = function isObject(target) {
  return target !== null
    && (
      typeof target === 'object'
      || typeof target === 'function'
    );
};

module.exports.assign = function assign(target, source) {
  Object.keys(source).forEach(function(key) {
    target[key] = source[key];
  });
};

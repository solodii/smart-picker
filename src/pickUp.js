'use strict';

var utils = require('./utils');

module.exports = function pickUp(syntaxTree, target) {
  var result = {};

  if (!utils.isObject(target)) {
    return result;
  }

  var properties = syntaxTree.properties;
  var i;
  var property;
  var name;
  var alias;

  for (i = 0; i < properties.length; i++) {
    property = properties[i];
    name = property.name;
    alias = property.alias || name;

    if (target.hasOwnProperty(name)) {
      result[alias] = target[name];
    }
  }

  var subtrees = syntaxTree.subtrees;
  var subtree;

  for (i = 0; i < subtrees.length; i++) {
    subtree = subtrees[i];
    name = subtree.key.name;

    if (target.hasOwnProperty(name)) {
      utils.assign(result, pickUp(subtree, target[name]));
    }
  }

  return result;
};

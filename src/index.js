'use strict';

var createSyntaxTree = require('./createSyntaxTree');
var pick = require('./pick');
var pickUp = require('./pickUp');

module.exports.createPicker = function createPicker(schema) {
  var syntaxTree = createSyntaxTree(schema);

  return {
    pick: pick.bind(null, syntaxTree),
    pickUp: pickUp.bind(null, syntaxTree)
  };
};

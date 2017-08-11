'use strict';

module.exports = function createSyntaxTree(schema) {
  if (typeof schema !== 'string') {
    throw new TypeError('schema is not a string');
  }

  var syntaxTree = parseSchema(schema);

  if (!syntaxTree) {
    throw new TypeError('schema is invalid');
  }

  return parseProperties(parseKeys(syntaxTree));
};

function parseProperties(syntaxTree) {
  var innerSchema = syntaxTree.innerSchema;
  var subtrees = syntaxTree.subtrees;
  var subtree;
  var i;
  var clean = '';
  var pos = 0;

  for (i = 0; i < subtrees.length; i++) {
    subtree = subtrees[i];
    clean += innerSchema.slice(pos, subtree.offset);
    pos = subtree.offset + subtree.outerSchema.length;
    parseProperties(subtree);
  }

  clean += innerSchema.slice(pos);

  var propertyString = '';
  var properties = [];

  for (i = 0; i < clean.length; i++) {
    if (clean[i] !== ',') {
      propertyString += clean[i];
    } else if (propertyString) {
      properties.push(
        parsePropertyName(propertyString)
      );
      propertyString = '';
    }
  }

  if (propertyString) {
    properties.push(
      parsePropertyName(propertyString)
    );
  }

  syntaxTree.properties = properties;

  return syntaxTree;
}

function parseKeys(syntaxTree) {
  var outerSchema = syntaxTree.outerSchema;
  var innerSchema = syntaxTree.innerSchema;
  var keyLength = outerSchema.length - innerSchema.length - 2;

  syntaxTree.key = keyLength
    ? parsePropertyName(
      outerSchema.slice(0, keyLength)
    )
    : null;

  syntaxTree.subtrees.forEach(parseKeys);

  return syntaxTree;
}

function parseSchema(schema) {
  schema = schema.replace(/\s/g, '');

  var syntaxTree = null;
  var stack = [];
  var contextMap = {};
  var i;
  var contextPos;
  var stackLength;
  var context;
  var parentContextPos;
  var outerStart;

  for (i = 0; i < schema.length; i++) {
    if (schema[i] === '{') {
      stack.push(i);
      contextMap[i] = {
        subtrees: []
      };
    } else if (schema[i] === '}' && stack.length) {
      contextPos = stack.pop();
      stackLength = stack.length;
      context = contextMap[contextPos];
      parentContextPos = stack[stackLength - 1];
      outerStart = stackLength
        ? getOuterStart(schema, contextPos, parentContextPos)
        : 0;

      context.offset = stackLength ? outerStart - parentContextPos - 1 : 0;
      context.outerSchema = schema.slice(outerStart, i + 1);
      context.innerSchema = schema.slice(contextPos + 1, i);

      if (stackLength) {
        contextMap[parentContextPos].subtrees.push(context);
      } else {
        syntaxTree = context;
        break;
      }
    }
  }

  return syntaxTree;
}

function getOuterStart(schema, contextPos, parentContextPos) {
  var commaIndex = schema.lastIndexOf(',', contextPos);

  return (commaIndex > parentContextPos ? commaIndex : parentContextPos) + 1;
}

function parsePropertyName(propertyString) {
  var splited = propertyString.split(':');

  return {
    name: splited[0] || null,
    alias: splited[1] || null
  };
}

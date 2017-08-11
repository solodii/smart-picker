var createSyntaxTree = require('../src/createSyntaxTree');
var mocks = require('../mocks');

describe('createSyntaxTree', function() {
  it('should throw TypeError if schema is not a string', function() {
    expect(function() {
      createSyntaxTree();
    }).toThrow();
  });

  it('should throw TypeError if schema is invalid', function() {
    expect(function() {
      createSyntaxTree('');
    }).toThrow();
    expect(function() {
      createSyntaxTree('{');
    }).toThrow();
    expect(function() {
      createSyntaxTree('}');
    }).toThrow();
  });

  it('should create a syntax tree that corresponds to schema', function() {
    expect(
      createSyntaxTree(mocks.schema)
    ).toMatchSnapshot();
  });
});

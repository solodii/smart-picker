var createPicker = require('../src/index').createPicker;
var mocks = require('../mocks');

describe('pick', function() {
  var picker = createPicker(mocks.schema);

  it('should return an object if target is not an object', function() {
    expect(picker.pick()).toEqual({});
    expect(picker.pick(null)).toEqual({});
    expect(picker.pick(0)).toEqual({});
    expect(picker.pick('')).toEqual({});
  });

  it('should pick queried object properties', function() {
    expect(
      picker.pick(mocks.target)
    ).toMatchSnapshot();
  });
});

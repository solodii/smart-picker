var createPicker = require('../src/index').createPicker;
var mocks = require('../mocks');

describe('pickUp', function() {
  var picker = createPicker(mocks.schema);

  it('should return an object if target is not an object', function() {
    expect(picker.pickUp()).toEqual({});
    expect(picker.pickUp(null)).toEqual({});
    expect(picker.pickUp(0)).toEqual({});
    expect(picker.pickUp('')).toEqual({});
  });

  it('should pickUp queried object properties', function() {
    expect(
      picker.pickUp(mocks.target)
    ).toMatchSnapshot();
  });
});

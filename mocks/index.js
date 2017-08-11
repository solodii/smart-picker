module.exports.schema = `{
  a: a_alias,
  b: {
    c: {
      d: d_alias
    },
    e: {
      1: f
    },
    nonexistent: {}
  },
  nonexistent,
  :,
  func: {
    length
  }
}`;

module.exports.target = {
  a: 'a_prop',
  b: {
    c: {
      d: 'd_prop',
      ignored: 'ignored_prop'
    },
    e: [
      'ignored_item',
      {
        g: 'g_prop',
        h: 'h_prop'
      },
      'ignored_item'
    ],
    ignored: 'ignored_prop'
  },
  func: function(a, b, c) {}
};

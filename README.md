# smart-picker

**smart-picker** is a convenient way to pick object properties for JavaScript apps.

[![build status](https://img.shields.io/travis/solodii/smart-picker/master.svg?style=flat-square)](https://travis-ci.org/solodii/smart-picker)
[![npm version](https://img.shields.io/npm/v/smart-picker.svg?style=flat-square)]
(https://www.npmjs.com/package/smart-picker)

### Installation

To install the stable version:

```
npm install --save smart-picker
```

This assumes you are using [npm](https://www.npmjs.com/) as your package manager.  

The smart-picker source code is written in ES5 so it works in [any modern browser](http://caniuse.com/#feat=es5). You don't need to use Babel or a module bundler to get started with smart-picker.

### Examples

###### Simple pick

```js
import { createPicker } from 'smart-picker';

const picker = createPicker(`{
  a,
  c: c_alias
}`);

const result = picker.pick({
  a: 'a',
  b: 'b',
  c: 'c'
});

expect(result).toEqual({
  a: 'a',
  c_alias: 'c'
});
```

###### Pick from array

```js
import { createPicker } from 'smart-picker';

const picker = createPicker(`{
  1: b
}`);

const result = picker.pick([
  1,
  2,
  3
]);

expect(result).toEqual({
  b: 2
});
```

###### Deep pick

```js
import { createPicker } from 'smart-picker';

const picker = createPicker(`{
  a: {
    b: b_alias: {
      c
    },
    f: {
      g: g_alias
    }
  }
}`);

const result = picker.pick({
  a: {
    b: {
      c: 'a'
    },
    d: 'd',
    e: 'e',
    f: {
      g: 'g'
    }
  }
});

expect(result).toEqual({
  a: {
    b_alias: {
      c: 'a'
    },
    f: {
      g_alias: 'g'
    }
  }
});
```

###### pickUp

```js
import { createPicker } from 'smart-picker';

const picker = createPicker(`{
  a: {
    b: b_alias: {
      c
    },
    f: {
      g: g_alias
    }
  }
}`);

const result = picker.pickUp({
  a: {
    b: {
      c: 'a'
    },
    d: 'd',
    e: 'e',
    f: {
      g: 'g'
    }
  }
});

expect(result).toEqual({
  c: 'a',
  g_alias: 'g'
});
```
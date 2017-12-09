### Toni

[![NPM VERSION](http://img.shields.io/npm/v/toni.svg?style=flat)](https://www.npmjs.org/package/toni)
[![CODACY BADGE](https://img.shields.io/codacy/b18ed7d95b0a4707a0ff7b88b30d3def.svg?style=flat)](https://www.codacy.com/public/44gatti/toni)
[![CODECLIMATE-TEST-COVERAGE](https://img.shields.io/codeclimate/coverage/github/rootslab/toni.svg?style=flat)](https://codeclimate.com/github/rootslab/toni)
[![LICENSE](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/rootslab/toni#mit-license)

![NODE VERSION](https://img.shields.io/node/v/toni.svg)
[![TRAVIS CI BUILD](http://img.shields.io/travis/rootslab/toni.svg?style=flat)](http://travis-ci.org/rootslab/toni)
[![BUILD STATUS](http://img.shields.io/david/rootslab/toni.svg?style=flat)](https://david-dm.org/rootslab/toni)
[![DEVDEPENDENCY STATUS](http://img.shields.io/david/dev/rootslab/toni.svg?style=flat)](https://david-dm.org/rootslab/toni#info=devDependencies)

[![NPM MONTHLY](http://img.shields.io/npm/dm/toni.svg?style=flat)](http://npm-stat.com/charts.html?package=toni)
![NPM YEARLY](https://img.shields.io/npm/dy/toni.svg)

[![NPM GRAPH](https://nodei.co/npm/toni.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/toni/)


> __Toni__, a simple and efficient bitmap implementation for positive integer sets (max 32 bits),
> with no element repetition, using bitwise operations and a Buffer.

> Modifying a single bit instead of an entire byte, to signal item presence in the current set,
> obviously saves __87.5%__ of Buffer space.

> See [BitArray](http://en.wikipedia.org/wiki/Bit_array).

### Install

```bash
$ npm install toni [-g]
```

> __require__:

```javascript
var Toni  = require( 'toni' );
```

### Run Tests

> install devDependencies :

```bash
 $ cd toni/
 # to update devDependencies, use 'npm update --dev'
 $ npm install --dev
 # run tests
 $ npm test
```

### Run Benchmarks

> run benchmarks for __Toni__.

```bash
$ cd toni/
$ npm run bench
```

### Constructor

> minimun range is 1 item/bit, max is 2^32 (from 1 to 4 bytes).

```javascript
Toni( Number range )
// or
new Toni( Number range )
```

### Properties

```javascript
 /*
  * the bitmap buffer.
  */
 Toni.bitmap : Buffer

 /*
  * max range for values (from 0 to range - 1).
  */
 Toni.range : Number

 /*
  * current items in the set.
  */
 Toni.items : Number

/*
  * a shortcut for the bitmap buffer length.
  */
 Toni.bmlen : Number

```

### Methods

> Arguments within [ ] are optional.

```javascript
/*
 * Clear the bitmap / set (filling with 0's).
 */
Toni#clear : function () : Toni

/*
 * Check for item presence in the set.
 * It returns 1 if item is present, 0 otherwise.
 */
Toni#chk : function ( Number value ) : Number

/*
 * Add an integer value to the set and test item/value presence in the set.
 * When the value is out of range, or if the element is already present, the
 * operation fails and it returns -1.
 *
 */
Toni#add : function ( Number value ) : Number

/*
 * Remove an integer value from the set and test item/value presence in the set.
 * When the value is out of range, or if the element is not in the set,
 * the operation fails and it returns -1.
 */
Toni#del : function ( Number value ) : Number

/*
 * It returns the occurrences of bit 1 until index i, then the total
 * number of 0s = index - rank( index ), if index is into the current
 * range, otherwise it returns -1
 */
Toni#rank : function ( Number index ) : Number
```

### MIT License

> Copyright (c) 2014-present &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> 'Software'), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:

> __The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.__

> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

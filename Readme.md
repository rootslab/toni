### Toni

[![NPM VERSION](http://img.shields.io/npm/v/toni.svg?style=flat)](https://www.npmjs.org/package/toni)
[![CODACY BADGE](https://img.shields.io/codacy/b18ed7d95b0a4707a0ff7b88b30d3def.svg?style=flat)](https://www.codacy.com/public/44gatti/toni)
[![CODECLIMATE](http://img.shields.io/codeclimate/github/rootslab/toni.svg?style=flat)](https://codeclimate.com/github/rootslab/toni)
[![CODECLIMATE-TEST-COVERAGE](https://img.shields.io/codeclimate/coverage/github/rootslab/toni.svg?style=flat)](https://codeclimate.com/github/rootslab/toni)
[![LICENSE](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/rootslab/toni#mit-license)

[![TRAVIS CI BUILD](http://img.shields.io/travis/rootslab/toni.svg?style=flat)](http://travis-ci.org/rootslab/toni)
[![BUILD STATUS](http://img.shields.io/david/rootslab/toni.svg?style=flat)](https://david-dm.org/rootslab/toni)
[![DEVDEPENDENCY STATUS](http://img.shields.io/david/dev/rootslab/toni.svg?style=flat)](https://david-dm.org/rootslab/toni#info=devDependencies)
[![NPM DOWNLOADS](http://img.shields.io/npm/dm/toni.svg?style=flat)](http://npm-stat.com/charts.html?package=toni)

[![NPM GRAPH1](https://nodei.co/npm-dl/toni.png)](https://nodei.co/npm/toni/)

[![NPM GRAPH2](https://nodei.co/npm/toni.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/toni/)

[![status](https://sourcegraph.com/api/repos/github.com/rootslab/toni/.badges/status.png)](https://sourcegraph.com/github.com/rootslab/toni)
[![views](https://sourcegraph.com/api/repos/github.com/rootslab/toni/.counters/views.png)](https://sourcegraph.com/github.com/rootslab/toni)
[![views 24h](https://sourcegraph.com/api/repos/github.com/rootslab/toni/.counters/views-24h.png)](https://sourcegraph.com/github.com/rootslab/toni)

> __Toni__, a simple and efficient bitmap implementation for positive integer sets (max 32 bits),
> with no element repetition, using bitwise operations and a Buffer.

> Modifying a single bit instead of an entire byte, to signal item presence in the current set,
> obviously saves __87.5%__ of Buffer space, but it also implies a gain greater than __200%__ in
> performances, for accessing values, when it was used with big integer ranges.

> See [BitArray](http://en.wikipedia.org/wiki/Bit_array).

###Install

```bash
$ npm install toni [-g]
```

> __require__:

```javascript
var Toni  = require( 'toni' );
```

###Run Tests

> install devDependencies :

```bash
 $ cd toni/
 # to update devDependencies, use 'npm update --dev'
 $ npm install --dev
 # run tests
 $ npm test
```

###Run Benchmarks

> run benchmarks for __Toni__.

```bash
$ cd toni/
$ npm run bench
```

###Constructor

> minimun range is 1 item/bit, max is 2^32 (from 1 to 4 bytes).

```javascript
Toni( Number range )
// or
new Toni( Number range )
```

###Properties

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

###Methods

> Arguments within [ ] are optional.

```javascript
/*
 * Clear the bitmap / set (filling with 0's).
 */
Toni#clear : function () : Toni

/*
 * Check for item presence in the set.
 * It returns a positive number if item is present, 0 otherwise.
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
```

### MIT License

> Copyright (c) 2015 &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

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

[![GA](https://ga-beacon.appspot.com/UA-53998692-1/toni/Readme?pixel)](https://github.com/igrigorik/ga-beacon)
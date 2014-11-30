### Toni

[![CODECLIMATE](http://img.shields.io/codeclimate/github/rootslab/toni.svg?style=flat)](https://codeclimate.com/github/rootslab/toni)
[![CODECLIMATE-TEST-COVERAGE](http://img.shields.io/codeclimate/coverage/github/rootslab/toni.svg?style=flat)](https://codeclimate.com/github/rootslab/toni)

[![LICENSE](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/rootslab/toni#mit-license)
[![GITTIP](http://img.shields.io/gittip/rootslab.svg?style=flat)](https://www.gittip.com/rootslab/)
[![NPM DOWNLOADS](http://img.shields.io/npm/dm/toni.svg?style=flat)](http://npm-stat.com/charts.html?package=toni)

[![NPM VERSION](http://img.shields.io/npm/v/toni.svg?style=flat)](https://www.npmjs.org/package/toni)
[![TRAVIS CI BUILD](http://img.shields.io/travis/rootslab/toni.svg?style=flat)](http://travis-ci.org/rootslab/toni)
[![BUILD STATUS](http://img.shields.io/david/rootslab/toni.svg?style=flat)](https://david-dm.org/rootslab/toni)
[![DEVDEPENDENCY STATUS](http://img.shields.io/david/dev/rootslab/toni.svg?style=flat)](https://david-dm.org/rootslab/toni#info=devDependencies)

[![NPM GRAPH1](https://nodei.co/npm-dl/toni.png)](https://nodei.co/npm/toni/)

[![NPM GRAPH2](https://nodei.co/npm/toni.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/toni/)

> __Toni__, a simple and efficient bitmap implementation for integer sets, using bitwise operations and a Buffer.
> Modifying a single bit instead of an entire byte, obviously saves 87.5% of Buffer space, with low performance loss.

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

```bash
$ cd toni/
$ npm test
```

###Constructor

```javascript
Toni( [ Object opt ] )
// or
new Toni( [ Object opt ] )
```

####Options

> Default options are listed.

```javascript
opt = {
    // minimun range is 8 items/bits (1 byte)
    range : 8
}
```

###Properties

```javascript
 /*
  * Instance configuration object.
  */
 Toni.options : Object

 /*
  * the bitmap buffer.
  */
 Toni.btable : Buffer

 /*
  * current items in the set.
  */
 Toni.items : Number

```

###Methods

> Arguments within [ ] are optional.

```javascript
/*
 * Clear the bitmap / set (filling with 0's).
 */
Toni#clear : function () : Toni

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

> Copyright (c) 2014 &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

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
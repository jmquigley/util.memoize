# util.memoize

> A utility wrapper for memoizing expensive functions

[![build](https://circleci.com/gh/jmquigley/util.memoize/tree/master.svg?style=shield)](https://circleci.com/gh/jmquigley/util.memoize/tree/master)
[![analysis](https://img.shields.io/badge/analysis-tslint-9cf.svg)](https://palantir.github.io/tslint/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![testing](https://img.shields.io/badge/testing-jest-blue.svg)](https://facebook.github.io/jest/)
[![NPM](https://img.shields.io/npm/v/util.memoize.svg)](https://www.npmjs.com/package/util.memoize)
[![Coverage Status](https://coveralls.io/repos/github/jmquigley/util.memoize/badge.svg?branch=master)](https://coveralls.io/github/jmquigley/util.memoize?branch=master)

[Memoization](https://en.wikipedia.org/wiki/Memoization) is used to cache the results of an expensive function call, where the same parameters to the function will always give the same return ([idempotent](https://en.wikipedia.org/wiki/Idempotence)).

```javascript
import memoize from "util.memoize";
const ret = memoize(3, 3, (x: number, y: number) => {return x + y});
```
e.g. the [memoize](docs/index.md#memoize) function can be called over and over again, but the given function is only executed the first time it is called.  All subsequent calls use a cached return value of that first call.

The last argument to the memoize() should be the function call whose return value will be cached.  The same function above can be rewritten without using an anonymous function to avoid the performance hit of regenerating the function over and over with:


```javascript
import memoize from "util.memoize";

function adder(x: number, y: number): number {
	return x + y;
}

const ret = memoize(3, 3, adder);
```

Note that this should only be used to cache functions that are expensive to call.  The `memoize()` contains overhead within to hash the parameters and function implementation to serve as a unique identifier for the cache.  If the hash is more expensive to compute than the function call, then don't use memoization.

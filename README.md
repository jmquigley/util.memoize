# util.memoize

> A utility wrapper for memoizing expensive functions

[![build](https://github.com/jmquigley/util.memoize/workflows/build/badge.svg)](https://github.com/jmquigley/util.memoize/actions)
[![analysis](https://img.shields.io/badge/analysis-tslint-9cf.svg)](https://palantir.github.io/tslint/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![testing](https://img.shields.io/badge/testing-jest-blue.svg)](https://facebook.github.io/jest/)
[![NPM](https://img.shields.io/npm/v/util.memoize.svg)](https://www.npmjs.com/package/util.memoize)

## Installation

This module uses [yarn](https://yarnpkg.com/en/) to manage dependencies and run scripts for development.

To install as an application dependency:
```
$ yarn add util.memoize
```

To build the app and run all tests:
```
$ yarn run all
```


## Overview

[Memoization](https://en.wikipedia.org/wiki/Memoization) is used to cache the results of an expensive function call, where the same parameters to the function will always give the same return ([idempotent](https://en.wikipedia.org/wiki/Idempotence)).

```javascript
import memoize from "util.memoize";
const ret = memoize(3, 3, (x: number, y: number) => {return x + y});
```
e.g. the [memoize](docs/index.md#memoize) function can be called over and over again, but the given function is only executed the first time it is called.  All subsequent calls use a cached return value of that first call.

The last argument to the `memoize()` should be the function call whose return value will be cached.  The same function above can be rewritten without using an anonymous function to avoid the performance hit of regenerating the function over and over with:


```javascript
import memoize from "util.memoize";

function adder(x: number, y: number): number {
	return x + y;
}

const ret = memoize(3, 3, adder);
```

The library also has a function named `memoizeFn` that returns a function reference that can be saved and used repeatedly.  This is a more traditional syntax to memoize a function (like [memoize-one](https://github.com/alexreardon/memoize-one).

```javascript
import {memoizeFn} from "util.memoize";

function adder(x: number, y: number): number {
	return x + y;
}

const memoizedAdder = memoizeFn(adder);

for (let i = 0; i < 5; i++) {
	const ret = memoizedAdder(3, 3);  // 6
}
```

This works like the previous example in that after the first call all subsequent calls are a cached return.  The `memoizeFn()` is just a convenience wrapper for the `memoize()`.

Note that this library should only be used to cache functions that are expensive to call.  The `memoize()` contains overhead within to hash the parameters and function implementation to serve as a unique identifier for the cache.  If the hash is more expensive to compute than the function call, then don't use memoization.


## API

- [memoize](docs/index.md#memoize)
- [memoizeFn](docs/index.md#memoizeFn)
- [memoizeReset](docs/index.md#memoizeReset)

import {hashCode} from "util.string";

const debug = require("debug")("util.memoize");

let _cache = {};
const separator: string = "@@";

/**
 * Used to cache the results of an expensive function call, where the same
 * parameters to the function will always give the same return (idempotent)
 *
 * ```javascript
 * import memoize from "util.memoize";
 * const ret = memoize(3, 3, (x: number, y: number) => {return x + y});
 * ```
 *
 * e.g. the memoize can be called over and over again, but the given
 * function is only executed the first time it is called.  All subsequent
 * calls use a cached return value.
 *
 * The last argument to the memoize function should be the function that
 * will be cached.
 *
 * @param args {any[]} - arguments that will be passed to the memoized
 * function.  The last parameter must be a function taht will be
 * called.
 * @return {any} the value returned by the memoized call.
 */
export function memoize(...args: any[]): any {
	if (args.length < 1) {
		throw new Error(
			"The memoize function requires at least one argument (fn)."
		);
	}

	const fn = args.pop();

	if (typeof fn !== "function") {
		throw new Error(
			"Last parameter to memoize function must be the function to memoize."
		);
	}

	const s: string = args
		.map((it: any) => JSON.stringify(it))
		.join(separator)
		.concat(`${separator}${fn.toString()}`);
	const id: number = hashCode(s);

	debug("hash string: %O -> %o", s, id);

	if (id in _cache) {
		return _cache[id];
	} else {
		const ret = fn(...args);
		_cache[id] = ret;
		return ret;
	}
}

/**
 * A more traditional wrapper for a function to be memoized.  This returns a
 * reference to a function that can be called over and over instead of using
 * memoize directly.  The reference can then be saved and called over and over.
 * @param fn {function} - the function to memoize
 * @return {function} a memoized version of the function
 */
export function memoizeFn(fn: any): () => any {
	return (...args: any[]) => {
		args.push(fn);
		return memoize(...args);
	};
}

/**
 * Resets the internal cache
 */
export function memoizeReset() {
	for (const key of Object.keys(_cache)) {
		_cache[key] = null;
	}

	_cache = {};
}

export default memoize;

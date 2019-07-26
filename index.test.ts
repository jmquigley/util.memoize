import assert from "power-assert";
import memoize from "./index";

function adder(x: number, y: number): number {
	return x + y;
}

test("Memoize a simple, anonymous function call", () => {
	for (let i = 0; i < 5; i++) {
		const ret = memoize(3, 3, (x: number, y: number) => {
			return x + y;
		});

		assert(ret === 6);
	}
});

test("Memoize an embedded function call", () => {
	for (let i = 0; i < 5; i++) {
		const ret = memoize(3, 3, adder);
		expect(ret).toBe(6);
	}
});

test("Test a simple call with no parameters", () => {
	const ret = memoize(() => console.log("test"));
	expect(ret).toBe(undefined);
});

test("Test a simple call with null parameter", () => {
	const ret = memoize(null, () => console.log("test"));
	expect(ret).toBe(undefined);
});

test("Use invalid parameters", () => {
	expect(() => {
		memoize();
	}).toThrowError(
		"The memoize function requires at least one argument (fn)."
	);
});

test("Call memoize without a memoized function", () => {
	expect(() => {
		memoize(3, 3);
	}).toThrowError(
		"Last parameter to memoize function must be the function to memoize."
	);
});

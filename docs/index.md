<a name="memoize"></a>

## memoize(args) ⇒ <code>any</code>
Used to cache the results of an expensive function call, where the same
parameters to the function will always give the same return (idempotent)

```javascript
import memoize from "util.memoize";
const ret = memoize(3, 3, (x: number, y: number) => {return x + y});
```

e.g. the memoize can be called over and over again, but the given
function is only executed the first time it is called.  All subsequent
calls use a cached return value.

The last argument to the memoize function should be the function that
will be cached.

**Kind**: global function  
**Returns**: <code>any</code> - the value returned by the memoized call.  
**Params**

- args <code>Array.&lt;any&gt;</code> - arguments that will be passed to the memoized
function.  The last parameter must be a function taht will be
called.


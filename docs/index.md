## Functions

<dl>
<dt><a href="#memoize">memoize(args)</a> ⇒ <code>any</code></dt>
<dd><p>Used to cache the results of an expensive function call, where the same
parameters to the function will always give the same return (idempotent)</p>
<pre><code class="language-javascript">import memoize from &quot;util.memoize&quot;;
const ret = memoize(3, 3, (x: number, y: number) =&gt; {return x + y});</code></pre>
<p>e.g. the memoize can be called over and over again, but the given
function is only executed the first time it is called.  All subsequent
calls use a cached return value.</p>
<p>The last argument to the memoize function should be the function that
will be cached.</p>
</dd>
<dt><a href="#memoizeFn">memoizeFn(fn)</a> ⇒ <code>function</code></dt>
<dd><p>A more traditional wrapper for a function to be memoized.  This returns a
reference to a function that can be called over and over instead of using
memoize directly.  The reference can then be saved and called over and over.</p>
</dd>
<dt><a href="#memoizeReset">memoizeReset()</a></dt>
<dd><p>Resets the internal cache</p>
</dd>
</dl>

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

<a name="memoizeFn"></a>

## memoizeFn(fn) ⇒ <code>function</code>
A more traditional wrapper for a function to be memoized.  This returns a
reference to a function that can be called over and over instead of using
memoize directly.  The reference can then be saved and called over and over.

**Kind**: global function  
**Returns**: <code>function</code> - a memoized version of the function  
**Params**

- fn <code>function</code> - the function to memoize

<a name="memoizeReset"></a>

## memoizeReset()
Resets the internal cache

**Kind**: global function  

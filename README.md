# Nested

Construct arbitrary complex datastructures that are lazily instantiated:

Arrays of hashes
```
var nested = require('nested');
// array of hashes
var ds = nested([ {} ]);
ds(0)['foo'] = 'bar';
```

Hashes of arrays
```
var nested = require('nested');
// array of hashes
var ds = nested({ of: [] });
ds('foo')[0] = 'bar';
```

See examples directory for more examples.

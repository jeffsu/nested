var nested = require('../lib/nested');
var assert = require('assert');

var struct = nested([ [] ]);
struct(0)[0] = 'foo';
assert.equal(struct(0)[0], 'foo');

var struct2 = nested([ [ [] ] ]);
struct2(0)(0)[0] = 'foo';
assert.equal(struct2(0)(0)[0], 'foo');

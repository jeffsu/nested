var nested = require('../lib/nested');
var assert = require('assert');

var struct = nested([ {} ]);
struct(0)['world'] = 'foo';
assert.equal(struct(0)['world'], 'foo');

var struct2 = nested({ of: [] });
struct2('hello')[0] = 'foo';
assert.equal(struct2('hello')[0], 'foo');

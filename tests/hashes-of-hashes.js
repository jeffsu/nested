var nested = require('../lib/nested');
var assert = require('assert');

var struct = nested({ of: {} });
struct('hello')['world'] = 'foo';
assert.equal(struct('hello')['world'], 'foo');

var struct2 = nested({ of: { of: {} } });
struct2('hello')('world')['hello'] = 'foo';
assert.equal(struct2('hello')('world')['hello'], 'foo');

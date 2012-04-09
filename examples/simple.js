var nested = require('../../nested');

// array of hashes
var aOh = nested([ {} ]);
aOh(0)['bar'] = 'bar';



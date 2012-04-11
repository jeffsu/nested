var nested = require('../lib/nested');
var array = nested([]);
array.push('hello');
console.log(array.length);
console.log(array.reject('hello').length);

var array = nested.close([]);

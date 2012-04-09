

var ARRAY = 0;
var HASH  = 1;

function struct(type) {
  switch(type) {
    case ARRAY:
      return [];
    case HASH:
      return {};
    default:
      return new type();
  }
}

function init(type) {
  if (type === undefined || type === null) {
    return null;
  } else if (type instanceof Array) {
    return curry(ARRAY, init(type[0]));
  } else if (typeof type === 'object') {
    return curry(HASH, init(type.of));
  } else if (typeof type === 'function') {
    return curry(type);
  } 

  throw "Invalid auto-struct declaration: " + JSON.stringify(type);
}

function curry(type, child) {
  var closed = struct(type);

  var ret = function (key) {
    var len = arguments.length;
    if (len == 0) {
      return closed;
    } else if (len == 1) {
      return closed[key] || (closed[key] = child.new());
    }
  };

  ret.me  = closed;
  ret.new = function () { return child ? curry(type, child) : struct(type) };

  return ret;
}

module.exports = init;

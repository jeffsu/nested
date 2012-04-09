

var ARRAY = 0;
var HASH  = 1;

var HELPERS = {
  each:     function () { return this.data.forEach.apply(this.data, arguments); },
  forEach:  function () { return this.data.forEach.apply(this.data, arguments); },
  contains: function (key) { return key in this.data; },

  included: function (lambda) {
    return !! this.each(function (ele) { 
      if (lambda(ele)) return true; 
    });
  },

  first: function (lambda) {
    var isFunct = isFunction(lambda);
    for (var k in this.data) {
      if (this.compare(k, lambda, isFunct)) return this.data[k];
    }
    return undefined;
  },

  reject: function (lambda) {
    var isFunct = isFunction(lambda);
    var ret = [];
    for (var k in this.data) {
      if (this.compare(k, lambda, isFunct)) ret[k] = this.data[k];
    }
    return ret;
  },

  reject1: function (lambda) {
    this.data = this.reject(lambda);
    return ret;
  },

  compare: function (key, lambda, isFunct) {
    return isFunct ? lambda(key) == this.data[key] : lambda == this.data[key];
  }
};

function isFunction(obj) {
  return typeof obj === 'function';
}

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

  if (type typeof === 'number') ret.__proto__ = helpers;

  ret.type = TYPE;
  ret.data = closed;
  ret.new  = function () { return child ? curry(type, child) : struct(type) };

  return ret;
}

module.exports = init;

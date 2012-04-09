

var ARRAY = 0;
var HASH  = 1;

var GenericClass = {
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

  reject$: function (lambda) {
    return this.data = this.reject(lambda);
  },

  select$: function (lambda) {
    return this.data = this.select(lambda);
  },

  compare: function (key, lambda, isFunct) {
    return isFunct ? lambda(key) == this.data[key] : lambda == this.data[key];
  }
};

var ArrayClass = {
  get length () {
    return this.data.length; 
  },

  reject: function (lambda) {
    var isFunct = isFunction(lambda);
    var ret = [];
    for (var k in this.data) {
      if (!this.compare(k, lambda, isFunct)) ret.push(this.data[k]);
    }
    return ret;
  },

  select: function (lambda) {
    var isFunct = isFunction(lambda);
    var ret = [];
    for (var k in this.data) {
      if (this.compare(k, lambda, isFunct)) ret.push(this.data[k]);
    }
    return ret;
  }

};

(function () { 
  [ 'push', 'pop', 'shift', 'unshift', 'concat' ].forEach(function (key) { 
    var funct = Array.prototype[key]; 
    ArrayClass[key] = function () { return funct.apply(this.data, arguments) };
  });
  ArrayClass.__proto__ = GenericClass
})();

var HashClass = { 
  reject: function (lambda) {
    var isFunct = isFunction(lambda);
    var ret = {};
    for (var k in this.data) {
      if (!this.compare(k, lambda, isFunct)) ret[key] = this.data[k];
    }
    return ret;
  },

  select: function (lambda) {
    var isFunct = isFunction(lambda);
    var ret = {};
    for (var k in this.data) {
      if (this.compare(k, lambda, isFunct)) ret[key] = this.data[k];
    }
    return ret;
  }
};
(function () {
  HashClass.__proto__ = GenericClass
})();

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

function _curry(closed, type, child) {
  var ret = function (key) {
    var len = arguments.length;
    if (len == 0) {
      return closed;
    } else if (len == 1) {
      return closed[key] || (closed[key] = child.new());
    }
  };

  if (typeof type === 'number') ret.__proto__ = type === ARRAY ? ArrayClass : HashClass;

  ret.type = type;
  ret.data = closed;
  ret.new  = function () { return child ? curry(type, child) : struct(type) };

  return ret;
}

function curry(type, child) {
  var closed = struct(type);
  return _curry(closed, type, child);
}

init.close = function (arg) { 
  var type = closed instanceof Array ? ARRAY : HASH;
  return _curry(closed, type, null);
}

module.exports = init;

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var _typeof = require('@babel/runtime/helpers/typeof');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);

var $$g = require('../internals/export');
var global$4 = require('../internals/global');
var isArray$1 = require('../internals/is-array');
var isConstructor = require('../internals/is-constructor');
var isObject$2 = require('../internals/is-object');
var toAbsoluteIndex$1 = require('../internals/to-absolute-index');
var lengthOfArrayLike$2 = require('../internals/length-of-array-like');
var toIndexedObject$1 = require('../internals/to-indexed-object');
var createProperty$2 = require('../internals/create-property');
var wellKnownSymbol$2 = require('../internals/well-known-symbol');
var arrayMethodHasSpeciesSupport$3 = require('../internals/array-method-has-species-support');
var un$Slice = require('../internals/array-slice');

var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$3('slice');

var SPECIES$1 = wellKnownSymbol$2('species');
var Array$1 = global$4.Array;
var max$1 = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$$g({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
  slice: function slice(start, end) {
    var O = toIndexedObject$1(this);
    var length = lengthOfArrayLike$2(O);
    var k = toAbsoluteIndex$1(start, length);
    var fin = toAbsoluteIndex$1(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray$1(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (isConstructor(Constructor) && (Constructor === Array$1 || isArray$1(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject$2(Constructor)) {
        Constructor = Constructor[SPECIES$1];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array$1 || Constructor === undefined) {
        return un$Slice(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array$1 : Constructor)(max$1(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty$2(result, n, O[k]);
    result.length = n;
    return result;
  }
});

var $$f = require('../internals/export');
var $reduce = require('../internals/array-reduce').left;
var arrayMethodIsStrict$2 = require('../internals/array-method-is-strict');
var CHROME_VERSION = require('../internals/engine-v8-version');
var IS_NODE$1 = require('../internals/engine-is-node');

var STRICT_METHOD$2 = arrayMethodIsStrict$2('reduce');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE$1 && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$$f({ target: 'Array', proto: true, forced: !STRICT_METHOD$2 || CHROME_BUG }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
  }
});

var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var redefine$1 = require('../internals/redefine');
var toString$4 = require('../internals/object-to-string');

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine$1(Object.prototype, 'toString', toString$4, { unsafe: true });
}

var $$e = require('../internals/export');
var IS_PURE$1 = require('../internals/is-pure');
var global$3 = require('../internals/global');
var getBuiltIn = require('../internals/get-built-in');
var call$1 = require('../internals/function-call');
var NativePromise = require('../internals/native-promise-constructor');
var redefine = require('../internals/redefine');
var redefineAll = require('../internals/redefine-all');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var setToStringTag = require('../internals/set-to-string-tag');
var setSpecies = require('../internals/set-species');
var aCallable = require('../internals/a-callable');
var isCallable = require('../internals/is-callable');
var isObject$1 = require('../internals/is-object');
var anInstance = require('../internals/an-instance');
var inspectSource = require('../internals/inspect-source');
var iterate = require('../internals/iterate');
var checkCorrectnessOfIteration$1 = require('../internals/check-correctness-of-iteration');
var speciesConstructor$1 = require('../internals/species-constructor');
var task = require('../internals/task').set;
var microtask = require('../internals/microtask');
var promiseResolve = require('../internals/promise-resolve');
var hostReportErrors = require('../internals/host-report-errors');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var Queue = require('../internals/queue');
var InternalStateModule$1 = require('../internals/internal-state');
var isForced = require('../internals/is-forced');
var wellKnownSymbol$1 = require('../internals/well-known-symbol');
var IS_BROWSER = require('../internals/engine-is-browser');
var IS_NODE = require('../internals/engine-is-node');
var V8_VERSION$1 = require('../internals/engine-v8-version');

var SPECIES = wellKnownSymbol$1('species');
var PROMISE = 'Promise';

var getInternalState$1 = InternalStateModule$1.getterFor(PROMISE);
var setInternalState$1 = InternalStateModule$1.set;
var getInternalPromiseState = InternalStateModule$1.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromisePrototype = NativePromisePrototype;
var TypeError$2 = global$3.TypeError;
var document$1 = global$3.document;
var process = global$3.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;

var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$3.dispatchEvent);
var NATIVE_REJECTION_EVENT = isCallable(global$3.PromiseRejectionEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;

var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED$1 = isForced(PROMISE, function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION$1 === 66) return true;
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE$1 && !PromisePrototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION$1 >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new PromiseConstructor(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});

var INCORRECT_ITERATION$1 = FORCED$1 || !checkCorrectnessOfIteration$1(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject$1(it) && isCallable(then = it.then) ? then : false;
};

var callReaction = function (reaction, state) {
  var value = state.value;
  var ok = state.state == FULFILLED;
  var handler = ok ? reaction.ok : reaction.fail;
  var resolve = reaction.resolve;
  var reject = reaction.reject;
  var domain = reaction.domain;
  var result, then, exited;
  try {
    if (handler) {
      if (!ok) {
        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
        state.rejection = HANDLED;
      }
      if (handler === true) result = value;
      else {
        if (domain) domain.enter();
        result = handler(value); // can throw
        if (domain) {
          domain.exit();
          exited = true;
        }
      }
      if (result === reaction.promise) {
        reject(TypeError$2('Promise-chain cycle'));
      } else if (then = isThenable(result)) {
        call$1(then, result, resolve, reject);
      } else resolve(result);
    } else reject(value);
  } catch (error) {
    if (domain && !exited) domain.exit();
    reject(error);
  }
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  microtask(function () {
    var reactions = state.reactions;
    var reaction;
    while (reaction = reactions.get()) {
      callReaction(reaction, state);
    }
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$1.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global$3.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_REJECTION_EVENT && (handler = global$3['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call$1(task, global$3, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  call$1(task, global$3, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError$2("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          call$1(then, value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED$1) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromisePrototype);
    aCallable(executor);
    call$1(Internal, this);
    var state = getInternalState$1(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  PromisePrototype = PromiseConstructor.prototype;
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState$1(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: new Queue(),
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromisePrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    // eslint-disable-next-line unicorn/no-thenable -- safe
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor$1(this, PromiseConstructor));
      state.parent = true;
      reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
      reaction.fail = isCallable(onRejected) && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      if (state.state == PENDING) state.reactions.add(reaction);
      else microtask(function () {
        callReaction(reaction, state);
      });
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState$1(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE$1 && isCallable(NativePromise) && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          call$1(nativeThen, that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });

      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
      redefine(NativePromisePrototype, 'catch', PromisePrototype['catch'], { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromisePrototype);
    }
  }
}

$$e({ global: true, wrap: true, forced: FORCED$1 }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$$e({ target: PROMISE, stat: true, forced: FORCED$1 }, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    call$1(capability.reject, undefined, r);
    return capability.promise;
  }
});

$$e({ target: PROMISE, stat: true, forced: IS_PURE$1 || FORCED$1 }, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE$1 && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$$e({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION$1 }, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call$1($promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      iterate(iterable, function (promise) {
        call$1($promiseResolve, C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var $$d = require('../internals/export');
var $filter = require('../internals/array-iteration').filter;
var arrayMethodHasSpeciesSupport$2 = require('../internals/array-method-has-species-support');

var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$2('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$$d({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $$c = require('../internals/export');
var uncurryThis$5 = require('../internals/function-uncurry-this');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var toLength$1 = require('../internals/to-length');
var toString$3 = require('../internals/to-string');
var notARegExp$1 = require('../internals/not-a-regexp');
var requireObjectCoercible$2 = require('../internals/require-object-coercible');
var correctIsRegExpLogic$1 = require('../internals/correct-is-regexp-logic');
var IS_PURE = require('../internals/is-pure');

// eslint-disable-next-line es/no-string-prototype-startswith -- safe
var un$StartsWith = uncurryThis$5(''.startsWith);
var stringSlice$1 = uncurryThis$5(''.slice);
var min$2 = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic$1('startsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith
$$c({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = toString$3(requireObjectCoercible$2(this));
    notARegExp$1(searchString);
    var index = toLength$1(min$2(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = toString$3(searchString);
    return un$StartsWith
      ? un$StartsWith(that, search, index)
      : stringSlice$1(that, index, index + search.length) === search;
  }
});

var DESCRIPTORS$1 = require('../internals/descriptors');
var FUNCTION_NAME_EXISTS = require('../internals/function-name').EXISTS;
var uncurryThis$4 = require('../internals/function-uncurry-this');
var defineProperty$1 = require('../internals/object-define-property').f;

var FunctionPrototype = Function.prototype;
var functionToString = uncurryThis$4(FunctionPrototype.toString);
var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
var regExpExec = uncurryThis$4(nameRE.exec);
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS$1 && !FUNCTION_NAME_EXISTS) {
  defineProperty$1(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return regExpExec(nameRE, functionToString(this))[1];
      } catch (error) {
        return '';
      }
    }
  });
}

var $$b = require('../internals/export');
var global$2 = require('../internals/global');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var lengthOfArrayLike$1 = require('../internals/length-of-array-like');
var toObject$2 = require('../internals/to-object');
var arraySpeciesCreate$1 = require('../internals/array-species-create');
var createProperty$1 = require('../internals/create-property');
var arrayMethodHasSpeciesSupport$1 = require('../internals/array-method-has-species-support');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$1('splice');

var TypeError$1 = global$2.TypeError;
var max = Math.max;
var min$1 = Math.min;
var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$$b({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject$2(this);
    var len = lengthOfArrayLike$1(O);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min$1(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
      throw TypeError$1(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate$1(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty$1(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

var $$a = require('../internals/export');
var exec$1 = require('../internals/regexp-exec');

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$$a({ target: 'RegExp', proto: true, forced: /./.exec !== exec$1 }, {
  exec: exec$1
});

var apply = require('../internals/function-apply');
var call = require('../internals/function-call');
var uncurryThis$3 = require('../internals/function-uncurry-this');
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var isRegExp = require('../internals/is-regexp');
var anObject = require('../internals/an-object');
var requireObjectCoercible$1 = require('../internals/require-object-coercible');
var speciesConstructor = require('../internals/species-constructor');
var advanceStringIndex = require('../internals/advance-string-index');
var toLength = require('../internals/to-length');
var toString$2 = require('../internals/to-string');
var getMethod = require('../internals/get-method');
var arraySlice = require('../internals/array-slice-simple');
var callRegExpExec = require('../internals/regexp-exec-abstract');
var regexpExec = require('../internals/regexp-exec');
var stickyHelpers = require('../internals/regexp-sticky-helpers');
var fails$2 = require('../internals/fails');

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var MAX_UINT32 = 0xFFFFFFFF;
var min = Math.min;
var $push = [].push;
var exec = uncurryThis$3(/./.exec);
var push = uncurryThis$3($push);
var stringSlice = uncurryThis$3(''.slice);

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$2(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

// @@split logic
fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = toString$2(requireObjectCoercible$1(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return call(nativeSplit, string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = call(regexpExec, separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          push(output, stringSlice(string, lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) apply($push, output, arraySlice(match, 1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !exec(separatorCopy, '')) push(output, '');
      } else push(output, stringSlice(string, lastLastIndex));
      return output.length > lim ? arraySlice(output, 0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : call(nativeSplit, this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible$1(this);
      var splitter = separator == undefined ? undefined : getMethod(separator, SPLIT);
      return splitter
        ? call(splitter, separator, O, limit)
        : call(internalSplit, toString$2(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var rx = anObject(this);
      var S = toString$2(string);
      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

      if (res.done) return res.value;

      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y ? 'g' : 'y');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice(S, q) : S);
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          push(A, stringSlice(S, p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            push(A, z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      push(A, stringSlice(S, p));
      return A;
    }
  ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

var $$9 = require('../internals/export');
var uncurryThis$2 = require('../internals/function-uncurry-this');
var IndexedObject = require('../internals/indexed-object');
var toIndexedObject = require('../internals/to-indexed-object');
var arrayMethodIsStrict$1 = require('../internals/array-method-is-strict');

var un$Join = uncurryThis$2([].join);

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD$1 = arrayMethodIsStrict$1('join', ',');

// `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join
$$9({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$1 }, {
  join: function join(separator) {
    return un$Join(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});

var $$8 = require('../internals/export');
var global$1 = require('../internals/global');
var fails$1 = require('../internals/fails');
var isArray = require('../internals/is-array');
var isObject = require('../internals/is-object');
var toObject$1 = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var createProperty = require('../internals/create-property');
var arraySpeciesCreate = require('../internals/array-species-create');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/engine-v8-version');

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
var TypeError = global$1.TypeError;

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$1(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$$8({ target: 'Array', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject$1(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

var global = require('../internals/global');
var DOMIterables = require('../internals/dom-iterables');
var DOMTokenListPrototype = require('../internals/dom-token-list-prototype');
var forEach = require('../internals/array-for-each');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var handlePrototype = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);

var $$7 = require('../internals/export');
var $entries = require('../internals/object-to-array').entries;

// `Object.entries` method
// https://tc39.es/ecma262/#sec-object.entries
$$7({ target: 'Object', stat: true }, {
  entries: function entries(O) {
    return $entries(O);
  }
});

var $$6 = require('../internals/export');
var assign = require('../internals/object-assign');

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$$6({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});

var $$5 = require('../internals/export');
var from = require('../internals/array-from');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$$5({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});

var charAt = require('../internals/string-multibyte').charAt;
var toString$1 = require('../internals/to-string');
var InternalStateModule = require('../internals/internal-state');
var defineIterator = require('../internals/define-iterator');

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString$1(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

var $$4 = require('../internals/export');
var toObject = require('../internals/to-object');
var nativeKeys = require('../internals/object-keys');
var fails = require('../internals/fails');

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$$4({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});

var $$3 = require('../internals/export');
var $includes = require('../internals/array-includes').includes;
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$$3({ target: 'Array', proto: true }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');

var $$2 = require('../internals/export');
var uncurryThis$1 = require('../internals/function-uncurry-this');
var notARegExp = require('../internals/not-a-regexp');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toString = require('../internals/to-string');
var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');

var stringIndexOf = uncurryThis$1(''.indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$$2({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~stringIndexOf(
      toString(requireObjectCoercible(this)),
      toString(notARegExp(searchString)),
      arguments.length > 1 ? arguments[1] : undefined
    );
  }
});

var $$1 = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var defineProperty = require('../internals/object-define-property').f;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
// eslint-disable-next-line es/no-object-defineproperty -- safe
$$1({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty, sham: !DESCRIPTORS }, {
  defineProperty: defineProperty
});

/* eslint-disable es/no-array-prototype-indexof -- required for testing */
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var $IndexOf = require('../internals/array-includes').indexOf;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var un$IndexOf = uncurryThis([].indexOf);

var NEGATIVE_ZERO = !!un$IndexOf && 1 / un$IndexOf([1], 1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? un$IndexOf(this, searchElement, fromIndex) || 0
      : $IndexOf(this, searchElement, fromIndex);
  }
});

var _default$1 = /*#__PURE__*/function () {
  function _default(options) {
    _classCallCheck__default["default"](this, _default);

    this.mAttr = 'data-' + options.dataName;
    this.mCaptureEvents = ['mouseenter', 'mouseleave'];
    this.el = options.el;
  }

  _createClass__default["default"](_default, [{
    key: "mInit",
    value: function mInit(modules) {
      var _this = this;

      this.modules = modules;
      this.mCheckEventTarget = this.mCheckEventTarget.bind(this);

      if (this.events) {
        Object.keys(this.events).forEach(function (event) {
          return _this.mAddEvent(event);
        });
      }
    }
  }, {
    key: "mUpdate",
    value: function mUpdate(modules) {
      this.modules = modules;
    }
  }, {
    key: "mDestroy",
    value: function mDestroy() {
      var _this2 = this;

      if (this.events) {
        Object.keys(this.events).forEach(function (event) {
          return _this2.mRemoveEvent(event);
        });
      }
    }
  }, {
    key: "mAddEvent",
    value: function mAddEvent(event) {
      var capture = this.mCaptureEvents.includes(event) ? true : false;
      this.el.addEventListener(event, this.mCheckEventTarget, capture);
    }
  }, {
    key: "mRemoveEvent",
    value: function mRemoveEvent(event) {
      var capture = this.mCaptureEvents.includes(event) ? true : false;
      this.el.removeEventListener(event, this.mCheckEventTarget, capture);
    }
  }, {
    key: "mCheckEventTarget",
    value: function mCheckEventTarget(e) {
      var event = this.events[e.type];

      if (typeof event === "string") {
        this[event](e);
      } else {
        var data = '[' + this.mAttr + ']';
        var target = e.target;

        if (this.mCaptureEvents.includes(e.type)) {
          if (target.matches(data)) {
            this.mCallEventMethod(e, event, target);
          }
        } else {
          while (target && target !== document) {
            if (target.matches(data)) {
              if (this.mCallEventMethod(e, event, target) != 'undefined') {
                break;
              }
            }

            target = target.parentNode;
          }
        }
      }
    }
  }, {
    key: "mCallEventMethod",
    value: function mCallEventMethod(e, event, target) {
      var name = target.getAttribute(this.mAttr);

      if (event.hasOwnProperty(name)) {
        var method = event[name];

        if (!e.hasOwnProperty('currentTarget')) {
          Object.defineProperty(e, 'currentTarget', {
            value: target
          });
        }

        if (!e.hasOwnProperty('curTarget')) {
          Object.defineProperty(e, 'curTarget', {
            value: target
          }); // For IE 11
        }

        this[method](e);
      }
    }
  }, {
    key: "$",
    value: function $(query, context) {
      var classIndex = query.indexOf('.');
      var idIndex = query.indexOf('#');
      var attrIndex = query.indexOf('[');
      var indexes = [classIndex, idIndex, attrIndex].filter(function (index) {
        return index != -1;
      });
      var index = false;
      var name = query;
      var more = '';
      var parent = this.el;

      if (indexes.length) {
        index = Math.min.apply(Math, _toConsumableArray__default["default"](indexes));
        name = query.slice(0, index);
        more = query.slice(index);
      }

      if (_typeof__default["default"](context) == 'object') {
        parent = context;
      }

      return parent.querySelectorAll('[' + this.mAttr + '=' + name + ']' + more);
    }
  }, {
    key: "parent",
    value: function parent(query, context) {
      var data = '[' + this.mAttr + '=' + query + ']';
      var parent = context.parentNode;

      while (parent && parent !== document) {
        if (parent.matches(data)) {
          return parent;
        }

        parent = parent.parentNode;
      }
    }
  }, {
    key: "getData",
    value: function getData(name, context) {
      var target = context || this.el;
      return target.getAttribute(this.mAttr + '-' + name);
    }
  }, {
    key: "setData",
    value: function setData(name, value, context) {
      var target = context || this.el;
      return target.setAttribute(this.mAttr + '-' + name, value);
    }
  }, {
    key: "call",
    value: function call(func, args, mod, id) {
      var _this3 = this;

      if (args && !mod) {
        mod = args;
        args = false;
      }

      if (this.modules[mod]) {
        if (id) {
          if (this.modules[mod][id]) {
            this.modules[mod][id][func](args);
          }
        } else {
          Object.keys(this.modules[mod]).forEach(function (id) {
            _this3.modules[mod][id][func](args);
          });
        }
      }
    }
  }, {
    key: "on",
    value: function on(e, mod, func, id) {
      var _this4 = this;

      if (this.modules[mod]) {
        if (id) {
          this.modules[mod][id].el.addEventListener(e, function (o) {
            return func(o);
          });
        } else {
          Object.keys(this.modules[mod]).forEach(function (i) {
            _this4.modules[mod][i].el.addEventListener(e, function (o) {
              return func(o);
            });
          });
        }
      }
    }
  }, {
    key: "init",
    value: function init() {}
  }, {
    key: "destroy",
    value: function destroy() {}
  }]);

  return _default;
}();

var toUpper = function toUpper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

var toCamel = function toCamel(arr) {
  return arr.reduce(function (a, b) {
    return a + toUpper(b);
  });
};

var getModule = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(name) {
    var module;
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (function (t) { return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(t)); }); })("@/scripts/modules/".concat(name)
            /* webpackChunkName: "module-[request]" */
            );

          case 2:
            module = _context.sent;
            return _context.abrupt("return", module.default);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getModule(_x) {
    return _ref.apply(this, arguments);
  };
}();

var destroyModule = function destroyModule(module) {
  module.mDestroy();
  module.destroy();
};

var asyncForEach = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2(array, callback) {
    var index;
    return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            index = 0;

          case 1:
            if (!(index < array.length)) {
              _context2.next = 7;
              break;
            }

            _context2.next = 4;
            return callback(array[index], index, array);

          case 4:
            index += 1;
            _context2.next = 1;
            break;

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function asyncForEach(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = /*#__PURE__*/function () {
  function _default(options) {
    _classCallCheck__default["default"](this, _default);

    // eslint-disable-next-line no-unused-expressions
    this.app;
    this.modules = options.modules || [];
    this.currentModules = {};
    this.activeModules = {};
    this.newModules = {};
    this.moduleId = 0;
  }

  _createClass__default["default"](_default, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee3(app, scope) {
        return _regeneratorRuntime__default["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.collectModules(app, scope);

              case 2:
                this.initModules(scope);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function init(_x4, _x5) {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "collectModules",
    value: function () {
      var _collectModules = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee6(app, scope) {
        var _this = this;

        var container, elements;
        return _regeneratorRuntime__default["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // console.info('✨ Modules collected');
                container = scope || document;
                elements = _toConsumableArray__default["default"](container.querySelectorAll('*')).filter(function (el) {
                  return _toConsumableArray__default["default"](el.attributes).some(function (attr) {
                    return attr.name.startsWith('data-module');
                  });
                });

                if (app && !this.app) {
                  this.app = app;
                }

                this.activeModules.app = {
                  app: this.app
                };
                _context6.next = 6;
                return asyncForEach(elements, /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee5(el) {
                    return _regeneratorRuntime__default["default"].wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _context5.next = 2;
                            return asyncForEach(_toConsumableArray__default["default"](el.attributes), /*#__PURE__*/function () {
                              var _ref5 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee4(_ref4) {
                                var name, value, dataName, moduleExists, moduleName, module, options, _module, id, moduleId;

                                return _regeneratorRuntime__default["default"].wrap(function _callee4$(_context4) {
                                  while (1) {
                                    switch (_context4.prev = _context4.next) {
                                      case 0:
                                        name = _ref4.name, value = _ref4.value;

                                        if (!name.startsWith('data-module')) {
                                          _context4.next = 15;
                                          break;
                                        }

                                        dataName = name.split('-').splice(2);
                                        moduleExists = false;
                                        moduleName = toUpper(toCamel(dataName));

                                        if (!_this.modules[moduleName]) {
                                          _context4.next = 9;
                                          break;
                                        }

                                        moduleExists = true;
                                        _context4.next = 14;
                                        break;

                                      case 9:
                                        _context4.next = 11;
                                        return getModule(moduleName);

                                      case 11:
                                        module = _context4.sent;
                                        _this.modules[moduleName] = module;
                                        moduleExists = true; // console.log(`📥 Module ${moduleName} imported`);

                                      case 14:
                                        if (moduleExists) {
                                          options = {
                                            el: el,
                                            name: moduleName,
                                            dataName: dataName.join('-')
                                          };
                                          _module = new _this.modules[moduleName](options);
                                          id = value;

                                          if (!id) {
                                            _this.moduleId += 1;
                                            id = "m".concat(_this.moduleId);
                                            el.setAttribute(name, id);
                                          }

                                          _this.addActiveModule(moduleName, id, _module);

                                          moduleId = "".concat(moduleName, "-").concat(id); // console.log(this.newModules);

                                          // console.log(this.newModules);
                                          if (scope) {
                                            _this.newModules[moduleId] = _module;
                                          } else {
                                            _this.currentModules[moduleId] = _module;
                                          }
                                        }

                                      case 15:
                                      case "end":
                                        return _context4.stop();
                                    }
                                  }
                                }, _callee4);
                              }));

                              return function (_x9) {
                                return _ref5.apply(this, arguments);
                              };
                            }());

                          case 2:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5);
                  }));

                  return function (_x8) {
                    return _ref3.apply(this, arguments);
                  };
                }());

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function collectModules(_x6, _x7) {
        return _collectModules.apply(this, arguments);
      }

      return collectModules;
    }()
  }, {
    key: "initModules",
    value: function initModules(scope) {
      var _this2 = this;

      // console.log(`✨ Modules initialized`);
      Object.entries(this.currentModules).forEach(function (_ref6) {
        var _ref7 = _slicedToArray__default["default"](_ref6, 2),
            id = _ref7[0],
            module = _ref7[1];

        if (scope) {
          // console.log(`✅ Module ${id} activated`);
          var split = id.split('-');
          var moduleName = split.shift();
          var moduleId = split.pop();

          _this2.addActiveModule(moduleName, moduleId, module);
        } else {
          // console.log(`✅ Module ${id} initialized`);
          _this2.initModule(module);
        }
      });
    }
  }, {
    key: "initModule",
    value: function initModule(module) {
      // console.info(`✨ Module initialized`);
      module.mInit(this.activeModules);
      module.init();
    }
  }, {
    key: "addActiveModule",
    value: function addActiveModule(name, id, module) {
      // console.info(`Modular.addActiveModule()`, name, id, this.activeModules[name]);
      if (this.activeModules[name]) {
        Object.assign(this.activeModules[name], _defineProperty__default["default"]({}, id, module));
      } else {
        this.activeModules[name] = _defineProperty__default["default"]({}, id, module);
      }
    }
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee7(scope) {
        var _this3 = this;

        return _regeneratorRuntime__default["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.init(this.app, scope);

              case 2:
                // eslint-disable-next-line no-unused-vars
                Object.entries(this.currentModules).forEach(function (_ref8) {
                  var _ref9 = _slicedToArray__default["default"](_ref8, 2);
                      _ref9[0];
                      var module = _ref9[1];

                  return module.mUpdate(_this3.activeModules);
                }); // eslint-disable-next-line no-unused-vars

                Object.entries(this.newModules).forEach(function (_ref10) {
                  var _ref11 = _slicedToArray__default["default"](_ref10, 2);
                      _ref11[0];
                      var module = _ref11[1];

                  return _this3.initModule(module);
                });
                Object.assign(this.currentModules, this.newModules);

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function update(_x10) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "destroy",
    value: function destroy(scope) {
      // console.info(`🗑 Modular.destroy()`, scope);
      if (scope) {
        this.destroyScope(scope);
      } else {
        this.destroyModules();
      }
    }
  }, {
    key: "destroyScope",
    value: function destroyScope(scope) {
      var _this4 = this;

      var elements = scope.querySelectorAll('*');
      elements.forEach(function (el) {
        Array.from(el.attributes).forEach(function (i) {
          if (i.name.startsWith('data-module')) {
            var id = i.value;
            var dataName = i.name.split('-').splice(2);
            var moduleName = "".concat(toCamel(dataName), "-").concat(id);
            var moduleExists = false;

            if (_this4.currentModules[moduleName]) {
              moduleExists = true;
            } else if (_this4.currentModules[toUpper(moduleName)]) {
              moduleName = toUpper(moduleName);
              moduleExists = true;
            }

            if (moduleExists) {
              destroyModule(_this4.currentModules[moduleName]);
              delete _this4.currentModules[moduleName];
            }
          }
        });
      });
      this.activeModules = {};
      this.newModules = {};
    }
  }, {
    key: "destroyModules",
    value: function destroyModules() {
      // eslint-disable-next-line no-unused-vars
      Object.entries(this.currentModules).forEach(function (_ref12) {
        var _ref13 = _slicedToArray__default["default"](_ref12, 2);
            _ref13[0];
            var module = _ref13[1];

        return destroyModule(module);
      });
      this.currentModules = [];
    }
  }]);

  return _default;
}();

exports["default"] = _default;
exports.module = _default$1;

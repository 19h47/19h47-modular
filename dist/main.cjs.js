'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var _default = /*#__PURE__*/function () {
  function _default(options) {
    _classCallCheck(this, _default);

    this.mAttr = 'data-' + options.dataName;
    this.mCaptureEvents = ['mouseenter', 'mouseleave'];
    this.el = options.el;
  }

  _createClass(_default, [{
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
        index = Math.min.apply(Math, _toConsumableArray(indexes));
        name = query.slice(0, index);
        more = query.slice(index);
      }

      if (_typeof(context) == 'object') {
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

exports.module = _default;

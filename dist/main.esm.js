function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

var toUpper = function toUpper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

var toCamel = function toCamel(arr) {
  return arr.reduce(function (a, b) {
    return a + toUpper(b);
  });
};

var getModule = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name) {
    var module;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return import("@/scripts/modules/".concat(name)
            /* webpackChunkName: "module-[request]" */
            );

          case 2:
            module = _context.sent;
            return _context.abrupt("return", module["default"]);

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
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(array, callback) {
    var index;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
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

var _default$1 = /*#__PURE__*/function () {
  function _default(options) {
    _classCallCheck(this, _default);

    // eslint-disable-next-line no-unused-expressions
    this.app;
    this.modules = options.modules || [];
    this.currentModules = {};
    this.activeModules = {};
    this.newModules = {};
    this.moduleId = 0;
  }

  _createClass(_default, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(app, scope) {
        var _this = this;

        var container, elements;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // console.clear();
                // console.info('✨ Modular.init()', { id: this.moduleId });
                container = scope || document;
                elements = _toConsumableArray(container.querySelectorAll('*')).filter(function (el) {
                  return _toConsumableArray(el.attributes).some(function (attr) {
                    return attr.name.startsWith('data-module');
                  });
                });

                if (app && !this.app) {
                  this.app = app;
                }

                this.activeModules.app = {
                  app: this.app
                };
                _context5.next = 6;
                return asyncForEach(elements, /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(el) {
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return asyncForEach(_toConsumableArray(el.attributes), /*#__PURE__*/function () {
                              var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref4) {
                                var name, value, dataName, moduleExists, moduleName, module, options, _module, id, moduleId;

                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                  while (1) {
                                    switch (_context3.prev = _context3.next) {
                                      case 0:
                                        name = _ref4.name, value = _ref4.value;

                                        if (!name.startsWith('data-module')) {
                                          _context3.next = 15;
                                          break;
                                        }

                                        dataName = name.split('-').splice(2);
                                        moduleExists = false;
                                        moduleName = toUpper(toCamel(dataName));

                                        if (!_this.modules[moduleName]) {
                                          _context3.next = 9;
                                          break;
                                        }

                                        moduleExists = true;
                                        _context3.next = 14;
                                        break;

                                      case 9:
                                        _context3.next = 11;
                                        return getModule(moduleName);

                                      case 11:
                                        module = _context3.sent;
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
                                        return _context3.stop();
                                    }
                                  }
                                }, _callee3);
                              }));

                              return function (_x7) {
                                return _ref5.apply(this, arguments);
                              };
                            }());

                          case 2:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function (_x6) {
                    return _ref3.apply(this, arguments);
                  };
                }());

              case 6:
                // console.log(`✨ Modular initialized`);
                Object.entries(this.currentModules).forEach(function (_ref6) {
                  var _ref7 = _slicedToArray(_ref6, 2),
                      id = _ref7[0],
                      module = _ref7[1];

                  if (scope) {
                    // console.log(`✅ Module ${id} activated`);
                    var split = id.split('-');
                    var moduleName = split.shift();
                    var moduleId = split.pop();

                    _this.addActiveModule(moduleName, moduleId, module);
                  } else {
                    // console.log(`✅ Module ${id} initialized`);
                    _this.initModule(module);
                  }
                });

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function init(_x4, _x5) {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "initModule",
    value: function initModule(module) {
      // console.info(`Modular.initModule()`, this.activeModules);
      module.mInit(this.activeModules);
      module.init();
    }
  }, {
    key: "addActiveModule",
    value: function addActiveModule(name, id, module) {
      // console.info(`Modular.addActiveModule()`, name, id, this.activeModules[name]);
      if (this.activeModules[name]) {
        Object.assign(this.activeModules[name], _defineProperty({}, id, module));
      } else {
        this.activeModules[name] = _defineProperty({}, id, module);
      }
    }
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(scope) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.init(this.app, scope);

              case 2:
                // eslint-disable-next-line no-unused-vars
                Object.entries(this.currentModules).forEach(function (_ref8) {
                  var _ref9 = _slicedToArray(_ref8, 2),
                      _ = _ref9[0],
                      module = _ref9[1];

                  return module.mUpdate(_this2.activeModules);
                }); // eslint-disable-next-line no-unused-vars

                Object.entries(this.newModules).forEach(function (_ref10) {
                  var _ref11 = _slicedToArray(_ref10, 2),
                      _ = _ref11[0],
                      module = _ref11[1];

                  return _this2.initModule(module);
                });
                Object.assign(this.currentModules, this.newModules);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function update(_x8) {
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
      var _this3 = this;

      var elements = scope.querySelectorAll('*');
      elements.forEach(function (el) {
        Array.from(el.attributes).forEach(function (i) {
          if (i.name.startsWith('data-module')) {
            var id = i.value;
            var dataName = i.name.split('-').splice(2);
            var moduleName = "".concat(toCamel(dataName), "-").concat(id);
            var moduleExists = false;

            if (_this3.currentModules[moduleName]) {
              moduleExists = true;
            } else if (_this3.currentModules[toUpper(moduleName)]) {
              moduleName = toUpper(moduleName);
              moduleExists = true;
            }

            if (moduleExists) {
              destroyModule(_this3.currentModules[moduleName]);
              delete _this3.currentModules[moduleName];
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
        var _ref13 = _slicedToArray(_ref12, 2),
            _ = _ref13[0],
            module = _ref13[1];

        return destroyModule(module);
      });
      this.currentModules = [];
    }
  }]);

  return _default;
}();

export default _default$1;
export { _default as module };

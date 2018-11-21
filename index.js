'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var Schema = _interopDefault(require('async-validator'));
var PropTypes = _interopDefault(require('prop-types'));

// 深拷贝
var cloneData = function cloneData(data) {
    if (Array.isArray(data)) {
        return data.map(function (item) {
            return cloneData(item);
        });
    } else if (data instanceof Object) {
        var keys = Object.keys(data);
        var newData = {};
        keys.forEach(function (key) {
            newData[key] = cloneData(data[key]);
        });
        return newData;
    } else {
        return data;
    }
};
// 获取assistData的key
var getAssistDataKey = function getAssistDataKey(keyList) {
    if (!keyList || !Array.isArray(keyList) || keyList.length === 0 || !keyList.includes('assistData')) {
        return [];
    }
    var index = keyList.indexOf('assistData');
    return keyList.filter(function (item, idx) {
        return idx > index;
    });
};
// 获取dataWrap
var getDataWrap = function getDataWrap(data, keyList) {
    if (data && Array.isArray(keyList)) {
        if (keyList.length === 0) {
            return {
                dataWrap: data,
                lastKey: ''
            };
        } else if (keyList.length === 1) {
            return {
                dataWrap: data,
                lastKey: keyList[0]
            };
        } else {
            var preKey = keyList[0],
                dataWrap = data,
                lastKey = keyList[keyList.length - 1];
            for (var i = 1; i < keyList.length; i++) {
                dataWrap = dataWrap && dataWrap[preKey] || {};
                var curKey = keyList[i];
                if (dataWrap && dataWrap[curKey] && dataWrap[curKey] instanceof Object) {
                    preKey = curKey;
                } else {
                    break;
                }
            }
            return {
                dataWrap: dataWrap,
                lastKey: lastKey
            };
        }
    } else {
        return {
            dataWrap: data,
            lastKey: keyList
        };
    }
};

// 获取lastkey及其值
var getLastKeyValue = function getLastKeyValue(data, keyList) {
    if (!data || !data instanceof Object || !keyList || !Array.isArray(keyList) || keyList.length === 0) {
        return {
            lastData: data,
            lastKey: keyList
        };
    }
    var lastData = data,
        lastKey = keyList[0];
    keyList.forEach(function (key) {
        lastData = lastData && lastData[key];
        lastKey = key;
    });
    return {
        lastData: lastData,
        lastKey: lastKey
    };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
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
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var rulesString = [{ type: 'string', msg: '必须为字符串' }, { type: 'number', msg: '必须为数字' }, { type: 'required', msg: '值不能为空' }, { type: 'boolean', msg: '必须为bool值' }, { type: 'integer', msg: '必须为整数型' }, { type: 'float', msg: '必须为浮点型' }, { type: 'enum', mag: '不在规定范围内' }, { type: 'date', msg: '必须为日期类型' }, { type: 'email', msg: '邮箱格式不正确' }];

var Validator = function (_Component) {
    inherits(Validator, _Component);

    function Validator(props) {
        classCallCheck(this, Validator);

        var _this = possibleConstructorReturn(this, (Validator.__proto__ || Object.getPrototypeOf(Validator)).call(this, props));

        _initialiseProps.call(_this);

        _this.state = {
            rules: {},
            validator: null
        };
        return _this;
    }

    createClass(Validator, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.refresh(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.config && nextProps.config !== this.props.config) {
                this.refresh(nextProps);
            }
        }
        // 重新解析规则

        // 创建validator

        // 更新规则

        // 解析出规则

        // 解析validate字段

        // 深层解析添加validator

    }, {
        key: 'render',
        value: function render() {
            return React__default.createElement(
                'div',
                { className: 'Validator' },
                this.props.children
            );
        }
    }]);
    return Validator;
}(React.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.refresh = function (props) {
        var _ref = props || _this2.props,
            config = _ref.config;

        var rules = _this2.state.rules;

        var newRules = _this2.getRules(config, props || _this2.props);
        _this2.setState({ rules: _extends({}, rules, newRules) }, _this2.createValidator);
    };

    this.createValidator = function () {
        var rules = _this2.state.rules;

        var validator = new Schema(rules);
        _this2.setState({ validator: validator });
    };

    this.refreshValid = function (keyList, item) {
        var rules = _this2.state.rules;

        if (Array.isArray(keyList) && Array.isArray(item.validate)) {
            var valid = _this2.analyValidate(item);
            _this2.addDeepValidator(rules, keyList, valid);
        }
        _this2.setState({ rules: rules }, _this2.createValidator);
    };

    this.getRules = function (config, props) {
        if (!config || !Array.isArray(config)) {
            return {};
        }
        var rules = _this2.state.rules;

        var keyList = [];
        config.forEach(function (item) {
            if (item.dataKey && item.dataKey.includes('.')) {
                keyList = item.dataKey.split('.');
            } else if (item.dataKey) {
                keyList = [item.dataKey];
            } else {
                keyList = [];
            }
            if (item.dataKey && item.validate && Array.isArray(item.validate)) {
                var valid = _this2.analyValidate(item);
                _this2.addDeepValidator(rules, keyList, valid);
            }
            if (Array.isArray(item.children)) {
                var data = props.data;

                var subRules = _this2.getRules(item.children);
                var childRules = {
                    type: 'array',
                    fields: {}
                };

                var _getLastKeyValue = getLastKeyValue(data, keyList),
                    lastData = _getLastKeyValue.lastData;

                if (lastData && Array.isArray(lastData)) {
                    lastData.forEach(function (child, childIdx) {
                        childRules.fields[childIdx] = {
                            type: 'object',
                            fields: _extends({}, subRules)
                        };
                    });
                }
                _this2.addDeepValidator(rules, keyList, childRules);
            }
        });
        return rules;
    };

    this.analyValidate = function (item) {
        if (!item.validate || !Array.isArray(item.validate) || item.validate.length === 0) {
            return [];
        }
        var valid = [];
        item.validate.forEach(function (child) {
            if (typeof child === 'string') {
                var rule = rulesString.find(function (subRule) {
                    return subRule.type === child;
                });
                if (rule) {
                    valid.push({
                        type: rule.type,
                        required: rule.type === 'required',
                        message: '' + (item.label ? item.label : '') + rule.msg
                    });
                }
            }
            if (child instanceof Object && child.type) {
                var _rule = rulesString.find(function (subRule) {
                    return subRule.type === child.type;
                });
                if (_rule) {
                    valid.push(_extends({
                        type: _rule.type,
                        required: _rule.type === 'required',
                        message: '' + (item.label ? item.label : '') + _rule.msg
                    }, child));
                }
            }
            // 正则表达式校验
            if (child instanceof RegExp) {
                valid.push({
                    pattern: child,
                    message: (item.label ? item.label : '') + '\u683C\u5F0F\u4E0D\u6B63\u786E'
                });
            }
            if (child instanceof Function) {
                valid.push({ validator: child });
            }
        });
        return valid;
    };

    this.addDeepValidator = function (rules, keyList, valid) {
        if (!rules || !rules instanceof Object || !Array.isArray(keyList) || keyList.length === 0) {
            return;
        }
        var len = keyList.length,
            lastKey = keyList[len - 1];
        var dataWrap = rules,
            preKey = keyList[0];
        for (var i = 1; i < len; i++) {
            var key = keyList[i];
            if (!dataWrap[preKey] || !dataWrap[preKey].fields) {
                dataWrap[preKey] = {
                    type: parseInt(key) == key ? 'array' : 'object',
                    fields: {}
                };
            }
            dataWrap = dataWrap[preKey].fields;
            preKey = key;
        }
        dataWrap[lastKey] = valid;
    };

    this.validate = function (data, keyList, callback) {
        var validator = _this2.state.validator;

        if (!validator || !data) {
            return;
        }
        var options = {
            firstFields: Array.isArray(keyList) ? [keyList.join('.')] : true
        };
        validator.validate(data, options, function (errors, fields) {
            if (errors && fields) {
                var _errors = fields;
                if (Array.isArray(keyList)) {
                    var key = keyList.join('.');
                    _errors = defineProperty({}, key, fields[key]);
                }
                _this2.props.setErrors(_errors, callback);
            } else {
                if (typeof keyList === 'undefined') {
                    _this2.props.cancelErrors(callback);
                } else {
                    if (callback && callback instanceof Function) {
                        callback();
                    }
                }
            }
        });
    };
};


var ValidItem = function (_Component2) {
    inherits(ValidItem, _Component2);

    function ValidItem(props) {
        classCallCheck(this, ValidItem);

        var _this3 = possibleConstructorReturn(this, (ValidItem.__proto__ || Object.getPrototypeOf(ValidItem)).call(this, props));

        _this3.state = {};
        return _this3;
    }

    createClass(ValidItem, [{
        key: 'render',
        value: function render() {
            var error = this.props.error;

            return React__default.createElement(
                'div',
                null,
                this.props.children,
                error && error.length > 0 && React__default.createElement(
                    'p',
                    { className: 'message-hint-area' },
                    error[0].message
                )
            );
        }
    }]);
    return ValidItem;
}(React.Component);

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".form_configurable-form-area__1oA_0 .form_form-item-wrap__-PBDy {\n  width: 350px;\n  margin-bottom: 18px;\n  position: relative;\n}\n.form_configurable-form-area__1oA_0 .form_form-item-wrap__-PBDy .form_form-group__3IOow {\n  display: flex;\n  align-items: center;\n}\n.form_configurable-form-area__1oA_0 .form_form-item-wrap__-PBDy .form_form-group__3IOow .form_label__3Ocf- {\n  color: rgba(0, 0, 0, 0.85);\n  font-size: 13px;\n  display: inline-block;\n  width: 100px;\n  flex: none;\n}\n.form_configurable-form-area__1oA_0 .form_form-item-wrap__-PBDy .form_form-group__3IOow .form_label__3Ocf- span {\n  display: inline-block;\n  width: 80px;\n  text-align: right;\n  position: relative;\n  top: -2px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  vertical-align: middle;\n}\n.form_configurable-form-area__1oA_0 .form_form-item-wrap__-PBDy .form_form-group__3IOow .form_label__3Ocf-.form_higher__3ZGT7 {\n  align-self: flex-start;\n  position: relative;\n  top: 6px;\n}\n.form_configurable-form-area__1oA_0 .form_form-item-wrap__-PBDy .form_form-group__3IOow .form_form-item__2xidx {\n  padding: 4px 11px;\n  flex: 1 1 auto;\n  min-width: 0;\n  display: inline-block;\n  font-size: 13px;\n  line-height: 1.5;\n  color: rgba(0, 0, 0, 0.65);\n  background-color: #fff;\n  border: 1px solid #d9d9d9;\n  border-radius: 4px;\n}\n.form_configurable-form-area__1oA_0 .form_form-item-wrap__-PBDy .form_form-group__3IOow .form_form-item__2xidx:hover {\n  border-color: #40a9ff;\n}\n.form_configurable-form-area__1oA_0 .form_form-item-wrap__-PBDy .form_form-group__3IOow .form_form-item__2xidx:focus {\n  outline: 0;\n  border-color: #40a9ff;\n  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);\n}\n.form_configurable-form-area__1oA_0 .form_form-item-wrap__-PBDy .form_form-group__3IOow .form_form-item__2xidx.form_error-style__YW4Da {\n  border-color: #f56c6c !important;\n  box-shadow: none !important;\n}\n.form_configurable-form-area__1oA_0 .form_form-item-wrap__-PBDy .form_form-group__3IOow .form_input-component__37Nri,\n.form_configurable-form-area__1oA_0 .form_form-item-wrap__-PBDy .form_form-group__3IOow .form_select-component__2rHml {\n  height: 32px;\n}\n.form_configurable-form-area__1oA_0 .form_form-item-wrap__-PBDy .form_form-group__3IOow .form_textarea-component__1rWa5 {\n  height: 100px;\n}\n.form_configurable-form-area__1oA_0 .form_form-item-wrap__-PBDy .form_form-group__3IOow .form_option-item__2uDSZ {\n  display: block;\n  padding: 5px 12px;\n  line-height: 22px;\n  font-weight: 400;\n  color: rgba(0, 0, 0, 0.65);\n  white-space: nowrap;\n  cursor: pointer;\n}\n.form_configurable-form-area__1oA_0 .form_form-item-wrap__-PBDy .form_form-group__3IOow .form_operation-btn-area__1Uqs3 {\n  display: inline-block;\n}\n.form_configurable-form-area__1oA_0 .form_form-item-wrap__-PBDy .form_form-group__3IOow .form_operation-btn-area__1Uqs3 .form_operation-btn__3-GqX {\n  margin-left: 10px;\n  color: #4AB2FF;\n  font-size: 12px;\n  cursor: pointer;\n}\n.form_configurable-form-area__1oA_0 .form_form-item-wrap__-PBDy .form_message-hint-area__2HSYU {\n  position: absolute;\n  right: 0;\n  height: 15px;\n  bottom: -14px;\n  font-size: 12px;\n  color: #f56c6c;\n  margin: 0;\n}\n.form_configurable-form-area__1oA_0 ::-webkit-input-placeholder {\n  color: #aaa;\n  font-size: 13px;\n}\n.form_configurable-form-area__1oA_0 ::-moz-placeholder {\n  color: #aaa;\n  font-size: 13px;\n}\n";
styleInject(css);

var FormItem = function (_Component) {
    inherits(FormItem, _Component);

    function FormItem() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, FormItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = FormItem.__proto__ || Object.getPrototypeOf(FormItem)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (keyList, value, success, config, param) {
            if (config && config.modifyDataFn && config.modifyDataFn instanceof Function) {
                config.modifyDataFn({
                    changeFn: function changeFn(data, success) {
                        _this.modifyDataFn(keyList, data, config, success);
                    },
                    changeDataFn: function changeDataFn(key, data, success) {
                        if (key) {
                            var curKeyList = [];
                            if (key.includes('.')) {
                                curKeyList = key.split('.');
                            } else {
                                curKeyList = [key];
                            }
                            _this.modifyDataFn(curKeyList, data, config, success);
                        } else {
                            _this.props.modifyAllData(data, success);
                        }
                    }
                }, param);
            } else {
                _this.modifyDataFn(keyList, value, config, success);
            }
        }, _this.modifyDataFn = function (keyList, value, config, success) {
            var submitFn = _this.props.submitFn;

            _this.props.modifyFn(keyList, value, function (data) {
                if (!config.preventSubmit && submitFn && submitFn instanceof Function) {
                    submitFn(data);
                }
                if (success && success instanceof Function) {
                    success(data);
                }
            });
        }, _this.loseFocus = function (keyList) {
            _this.props.loseFocusFn(keyList);
        }, _this.getFocus = function (keyList) {
            _this.props.getFocusFn(keyList);
        }, _this.handleAddItem = function (keyList, config) {
            var data = _this.props.data;

            var _getLastKeyValue = getLastKeyValue(data, keyList),
                lastData = _getLastKeyValue.lastData;

            if (Array.isArray(lastData)) {
                lastData.push(config.addItem);
            }
            _this.props.modifyAllData(data);
        }, _this.deleteItem = function (keyList, idx) {
            var data = _this.props.data;

            var _getLastKeyValue2 = getLastKeyValue(data, keyList),
                lastData = _getLastKeyValue2.lastData;

            if (Array.isArray(lastData)) {
                lastData.splice(idx, 1);
            }
            _this.props.modifyAllData(data);
        }, _this.getCustomFormItem = function (config, data) {
            var keyList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
            var childConfig = arguments[3];

            var customComponents = From.customComponents;
            var isHasCustom = customComponents.find(function (item) {
                return item.type === config.type;
            });
            if (isHasCustom) {
                var newConfig = _extends({}, isHasCustom, config, { type: 'container' });
                return _this.getFormItem(newConfig, data, keyList, childConfig);
            } else {
                return _this.getFormItem(config, data, keyList, childConfig);
            }
        }, _this.validFormItemConfig = function (config) {}
        //console.log(config)

        // 获取默认的表单组件
        , _this.getFormItem = function (config, data) {
            var keyList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
            var childConfig = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            var _this$props = _this.props,
                error = _this$props.error,
                assistData = _this$props.assistData;

            var formType = config.type || 'input';
            _this.validFormItemConfig(config);
            // 获取当前值
            var dataKey = config.dataKey,
                keys = [],
                curValue = data;
            if (dataKey && dataKey.includes('.')) {
                keys = dataKey.split('.');
                keys.forEach(function (key) {
                    keyList.push(key);
                    if (key && curValue) {
                        curValue = curValue[key];
                    }
                });
            } else {
                keyList.push(dataKey);
                curValue = curValue && curValue[dataKey];
            }
            if (Array.isArray(keyList) && keyList.includes('assistData')) {
                var newKeyList = getAssistDataKey(keyList);

                var _getLastKeyValue3 = getLastKeyValue(assistData, newKeyList),
                    lastData = _getLastKeyValue3.lastData;

                curValue = lastData;
            }
            var keyStr = Array.isArray(keyList) ? keyList.join('.') : config.dataKey;
            var errorClassName = error[keyStr] ? 'error-style' : '';
            var formItems = {
                'input': React__default.createElement('input', {
                    className: 'input-component form-item ' + errorClassName,
                    value: curValue,
                    placeholder: config.placeholder || '',
                    onFocus: function onFocus() {
                        return _this.getFocus(keyList);
                    },
                    onBlur: function onBlur() {
                        return _this.loseFocus(keyList);
                    },
                    onChange: function onChange(event) {
                        return _this.handleChange(keyList, event.target.value, function () {}, config);
                    } }),
                'textarea': React__default.createElement('textarea', {
                    className: 'textarea-component form-item ' + errorClassName,
                    value: curValue,
                    placeholder: config.placeholder || '',
                    onBlur: function onBlur() {
                        return _this.loseFocus(keyList);
                    },
                    onFocus: function onFocus() {
                        return _this.getFocus(keyList);
                    },
                    onChange: function onChange(event) {
                        return _this.handleChange(keyList, event.target.value, function () {}, config);
                    }
                }),
                'select': React__default.createElement(
                    'select',
                    {
                        className: 'select-component form-item ' + errorClassName,
                        value: curValue,
                        onClick: function onClick() {
                            return _this.getFocus(keyList);
                        },
                        onChange: function onChange(event) {
                            _this.handleChange(keyList, event.target.value, function (data) {
                                _this.loseFocus(keyList);
                            }, config);
                        } },
                    Array.isArray(config.options) && config.options.map(function (item, idx) {
                        var label = typeof item === 'string' ? item : item.label;
                        var value = typeof item === 'string' ? item : item.value;
                        return React__default.createElement(
                            'option',
                            { key: idx, className: 'option-item', value: value },
                            label
                        );
                    })
                ),
                'form_array': React__default.createElement(
                    'div',
                    { className: 'form-list-area' },
                    Array.isArray(curValue) && curValue.map(function (group, groupIdx) {
                        return React__default.createElement(
                            'div',
                            { key: groupIdx, className: 'form-list' },
                            config.children && config.children.map(function (item, idx) {
                                var newKeyList = [].concat(toConsumableArray(keyList), [groupIdx]);
                                return React__default.createElement(
                                    React__default.Fragment,
                                    { key: idx },
                                    _this.getFormItemWrap(item, curValue[groupIdx], newKeyList, {
                                        childType: 'children',
                                        index: groupIdx,
                                        parentKey: config.dataKey,
                                        parentData: curValue,
                                        parentConfig: config
                                    })
                                );
                            }),
                            !config.hideBtn && React__default.createElement(
                                'div',
                                { className: 'operation-btn-area' },
                                groupIdx === curValue.length - 1 && React__default.createElement(
                                    'span',
                                    { className: 'operation-btn', onClick: function onClick() {
                                            return _this.handleAddItem(keyList, config);
                                        } },
                                    '\u6DFB\u52A0'
                                ),
                                curValue.length > 1 && React__default.createElement(
                                    'span',
                                    { className: 'operation-btn', onClick: function onClick() {
                                            return _this.deleteItem(keyList, groupIdx);
                                        } },
                                    '\u5220\u9664'
                                )
                            )
                        );
                    })
                ),
                'container': React__default.createElement(
                    React__default.Fragment,
                    null,
                    config.render && config.render(curValue, _extends({}, config, childConfig), {
                        changeFn: function changeFn(data, success) {
                            var param = {
                                parent: childConfig,
                                self: _extends({}, config, {
                                    curData: data,
                                    preData: curValue
                                })
                            };
                            _this.handleChange(keyList, data, success, config, param);
                        },
                        changeDataFn: function changeDataFn(key, data, success) {
                            var param = {
                                parent: childConfig,
                                self: _extends({}, config, {
                                    curData: data,
                                    preData: curValue
                                })
                            };
                            if (key) {
                                var curKeyList = [];
                                if (key.includes('.')) {
                                    curKeyList = key.split('.');
                                } else {
                                    curKeyList = [key];
                                }
                                _this.handleChange(curKeyList, data, success, config, param);
                            } else {
                                _this.props.modifyAllData(data, success);
                            }
                        },
                        getFocus: function getFocus() {
                            _this.getFocus(keyList);
                        },
                        loseFocus: function loseFocus() {
                            _this.loseFocus(keyList);
                        },
                        JSONForm: function JSONForm(configArray) {
                            if (!configArray || !Array.isArray(configArray) || configArray.length === 0) {
                                return '';
                            }
                            return configArray.map(function (item, idx) {
                                var newKeyList = cloneData(keyList);
                                if (item.dataKey && item.dataKey.includes('.')) {
                                    newKeyList = newKeyList.concat(item.dataKey.split('.'));
                                } else if (item.dataKey) {
                                    newKeyList.push(item.dataKey);
                                }
                                _this.props.refreshValid(newKeyList, item);
                                return React__default.createElement(
                                    React__default.Fragment,
                                    { key: idx },
                                    _this.getFormItemWrap(item, curValue, cloneData(keyList), {
                                        childType: 'children',
                                        parentKey: config.dataKey,
                                        parentData: curValue,
                                        parentConfig: config
                                    })
                                );
                            });
                        },
                        error: error[keyStr],
                        assistData: _this.props.assistData,
                        data: _this.props.data
                    })
                )
            };
            return formItems[formType] || formItems['input'];
        }, _this.getFormItemWrap = function (config, data, keyList, childConfig) {
            var error = _this.props.error;

            var higherType = ['textarea', 'form_array'];
            var childElement = React__default.createElement(
                'div',
                { className: 'form-group' },
                config && config.label && React__default.createElement(
                    'label',
                    { className: higherType.includes(config.type) ? 'label higher' : 'label' },
                    React__default.createElement(
                        'span',
                        null,
                        config.label || ''
                    ),
                    '\uFF1A'
                ),
                _this.getCustomFormItem(config, data, keyList, childConfig)
            );
            if (childConfig && childConfig.childType === 'children') {
                var keyStr = Array.isArray(keyList) ? keyList.join('.') : config.dataKey;
                return React__default.createElement(
                    'div',
                    { className: 'form-item-wrap', style: config.style },
                    React__default.createElement(
                        ValidItem,
                        { error: error[keyStr] },
                        childElement
                    )
                );
            }
            return childElement;
        }, _temp), possibleConstructorReturn(_this, _ret);
    }
    // 点击事件

    // 修改数据

    // 失去焦点

    // 获得焦点

    // 添加item

    // 删除item

    // 获取自定义的表单组件

    // 校验组件的配置


    createClass(FormItem, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                config = _props.config,
                data = _props.data;

            var keyList = [];
            return this.getFormItemWrap(config, data, keyList);
        }
    }]);
    return FormItem;
}(React.Component);

var From = function (_Component) {
    inherits(From, _Component);

    function From(props) {
        classCallCheck(this, From);

        var _this = possibleConstructorReturn(this, (From.__proto__ || Object.getPrototypeOf(From)).call(this, props));

        _initialiseProps$1.call(_this);

        _this.state = {
            data: cloneData(props.config.data) || {},
            assistData: cloneData(props.config.assistData) || {},
            errors: {}
        };
        return _this;
    }
    // 自定义组件存储

    // 初始化自定义组件


    createClass(From, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getStoreData(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.config && nextProps.config !== this.props.config) {
                this.getStoreData(nextProps);
            }
        }
        // 读取缓存数据

        // 修改表单数据

        // 整体替换表单的值

        // 获取表单的值

        // 注册表单的提交函数

        // 表单失去焦点

        // 表单获得焦点

        // 设置报错信息

        // 清空errors

        // 更新校验rules

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var config = this.props.config;
            var _state = this.state,
                data = _state.data,
                assistData = _state.assistData,
                errors = _state.errors;

            return React__default.createElement(
                'div',
                { className: 'configurable-form-area ' + (config.className ? config.className : '') },
                React__default.createElement(
                    Validator,
                    { config: config.config,
                        setErrors: this.setErrors,
                        cancelErrors: this.cancelErrors,
                        data: data, ref: function ref(_ref) {
                            return _this2.validator = _ref;
                        } },
                    Array.isArray(config.config) && config.config.map(function (item, idx) {
                        return React__default.createElement(
                            'div',
                            { className: 'form-item-wrap', key: idx, style: item.style },
                            React__default.createElement(
                                ValidItem,
                                { error: errors[item.dataKey] },
                                React__default.createElement(FormItem, {
                                    config: item,
                                    data: data,
                                    assistData: assistData,
                                    modifyAllData: _this2.modifyAllData,
                                    modifyFn: _this2.modifyFn,
                                    submitFn: _this2.submitFn,
                                    refreshValid: _this2.refreshValid,
                                    loseFocusFn: _this2.handleLoseFocusFn,
                                    error: errors,
                                    getFocusFn: _this2.handleGetFocusFn })
                            )
                        );
                    })
                )
            );
        }
    }]);
    return From;
}(React.Component);

From.propTypes = {
    config: PropTypes.object
};
From.defaultProps = {
    config: {
        data: {},
        config: []
    }
};
From.customComponents = [];

From.createCustomComp = function (customComp) {
    if (customComp && Array.isArray(customComp)) {
        customComp.forEach(function (item) {
            if (item.render && item.type && From.customComponents.every(function (child) {
                return child.type !== item.type;
            })) {
                From.customComponents.push(item);
            }
        });
    }
};

var _initialiseProps$1 = function _initialiseProps() {
    var _this3 = this;

    this.getStoreData = function (props) {
        var config = props.config;

        if (config.formKey && typeof config.formKey === 'string') {
            var dataStr = window.localStorage.getItem(config.formKey);
            var storeData = {};
            try {
                storeData = JSON.parse(dataStr) || {};
            } catch (err) {
                console.log(err);
            }
            // if(['{}', '[]'].includes(JSON.stringify(storeData))){
            //     return
            // }
            var newData = _extends({}, cloneData(props.config.data), storeData);
            _this3.setState({ data: newData }, function () {
                _this3.validator.refresh();
            });
        }
    };

    this.modifyFn = function (keyList, value, success) {
        var _state2 = _this3.state,
            data = _state2.data,
            assistData = _state2.assistData;
        var config = _this3.props.config;

        var newData = cloneData(data);
        var newAssistData = cloneData(assistData);
        if (Array.isArray(keyList) && keyList.includes('assistData')) {
            var assistKeyList = getAssistDataKey(keyList);

            var _getDataWrap = getDataWrap(newAssistData, assistKeyList),
                dataWrap = _getDataWrap.dataWrap,
                lastKey = _getDataWrap.lastKey;

            dataWrap[lastKey] = value;
        } else {
            var _getDataWrap2 = getDataWrap(newData, keyList),
                _dataWrap = _getDataWrap2.dataWrap,
                _lastKey = _getDataWrap2.lastKey;

            _dataWrap[_lastKey] = value;
        }
        _this3.setState({
            data: newData,
            assistData: newAssistData
        }, function () {
            if (config.formKey && typeof config.formKey === 'string') {
                window.localStorage.setItem(config.formKey, JSON.stringify(_this3.state.data));
            }
            if (success && success instanceof Function) {
                success(_this3.state.data);
            }
        });
    };

    this.modifyAllData = function (data, success) {
        var config = _this3.props.config;

        _this3.setState({ data: data }, function () {
            _this3.validator.refresh();
            if (config.formKey && typeof config.formKey === 'string') {
                window.localStorage.setItem(config.formKey, JSON.stringify(_this3.state.data));
            }
            if (success && success instanceof Function) {
                success();
            }
        });
    };

    this.getValue = function (callback) {
        _this3.validator.validate(_this3.state.data, undefined, function () {
            var _state3 = _this3.state,
                errors = _state3.errors,
                data = _state3.data;

            if (callback && callback instanceof Function) {
                callback(JSON.stringify(errors) === '{}', data);
            }
        });
    };

    this.registerSubmit = function (callback) {
        _this3.submitFn = function (data) {
            _this3.validator.validate(data, undefined, function () {
                var _state4 = _this3.state,
                    errors = _state4.errors,
                    data = _state4.data;

                if (callback && callback instanceof Function) {
                    callback(JSON.stringify(errors) === '{}', data);
                }
            });
        };
    };

    this.handleLoseFocusFn = function (keyList) {
        _this3.validator.validate(_this3.state.data, keyList);
    };

    this.handleGetFocusFn = function (keyList) {
        var errors = _this3.state.errors;

        var keyStr = Array.isArray(keyList) ? keyList.join('.') : '';
        if (errors[keyStr]) {
            errors[keyStr] = undefined;
            _this3.setState({ errors: errors });
        }
    };

    this.setErrors = function (newError, callback) {
        var errors = _this3.state.errors;

        _this3.setState({ errors: _extends({}, errors, newError) }, function () {
            if (callback && callback instanceof Function) {
                callback();
            }
        });
    };

    this.cancelErrors = function (callback) {
        _this3.setState({ errors: {} }, function () {
            if (callback && callback instanceof Function) {
                callback();
            }
        });
    };

    this.refreshValid = function (keyList, itemConfig) {
        if (!_this3.validator) {
            setTimeout(function () {
                _this3.refreshValid(keyList, itemConfig);
            }, 10);
            return;
        }
        _this3.validator.refreshValid(keyList, itemConfig);
    };
};

module.exports = From;
//# sourceMappingURL=index.js.map

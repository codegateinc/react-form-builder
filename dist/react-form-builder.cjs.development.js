'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var outstated = require('outstated');
var gUtils = require('@codegateinc/g-utils');
var React = require('react');
var React__default = _interopDefault(React);

// @ts-ignore
var Input = function Input(_ref) {
  var component = _ref.component;
  return component();
};

// @ts-ignore
var CheckBox = function CheckBox(_ref) {
  var component = _ref.component;
  return component();
};

// @ts-ignore
var Picker = function Picker(_ref) {
  var component = _ref.component;
  return component();
};



var index = {
    __proto__: null,
    Input: Input,
    CheckBox: CheckBox,
    Picker: Picker
};

var FormFieldType;

(function (FormFieldType) {
  FormFieldType[FormFieldType["Input"] = 0] = "Input";
  FormFieldType[FormFieldType["Picker"] = 1] = "Picker";
  FormFieldType[FormFieldType["CheckBox"] = 2] = "CheckBox";
})(FormFieldType || (FormFieldType = {}));



var index$1 = {
    __proto__: null,
    get FormFieldType () { return FormFieldType; }
};

function _extends() {
  _extends = Object.assign || function (target) {
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

  return _extends.apply(this, arguments);
}

var formStore = function formStore() {
  var _useState = React.useState({}),
      formState = _useState[0],
      _setFormState = _useState[1];

  var _useState2 = React.useState({}),
      onChangeForm = _useState2[0],
      setOnChangeForm = _useState2[1];

  return {
    actions: {
      setFormState: function setFormState(key, state) {
        return _setFormState(function (prevState) {
          var _extends2;

          return _extends(_extends({}, prevState), {}, (_extends2 = {}, _extends2[key] = state, _extends2));
        });
      },
      setFormValue: function setFormValue(formKey, key, value, callback) {
        var _extends3, _extends4;

        if (!formState[formKey]) {
          return;
        }

        var newState = _extends(_extends({}, formState), {}, (_extends4 = {}, _extends4[formKey] = _extends(_extends({}, formState[formKey]), {}, (_extends3 = {}, _extends3[key] = _extends(_extends({}, formState[formKey][key]), {}, {
          value: value
        }), _extends3)), _extends4));

        _setFormState(function (prevState) {
          var _extends5, _extends6;

          return _extends(_extends({}, prevState), {}, (_extends6 = {}, _extends6[formKey] = _extends(_extends({}, prevState[formKey]), {}, (_extends5 = {}, _extends5[key] = _extends(_extends({}, prevState[formKey][key]), {}, {
            value: value
          }), _extends5)), _extends6));
        });

        gUtils.G.ifDefined(callback, function (fn) {
          return fn(newState[formKey]);
        });

        if (onChangeForm[formKey] && onChangeForm[formKey][key]) {
          onChangeForm[formKey][key](value);
        }
      },
      setFormError: function setFormError(formKey, key, errorMessage) {
        return formState[formKey] && _setFormState(function (prevState) {
          var _extends7, _extends8;

          return _extends(_extends({}, prevState), {}, (_extends8 = {}, _extends8[formKey] = _extends(_extends({}, prevState[formKey]), {}, (_extends7 = {}, _extends7[key] = _extends(_extends({}, prevState[formKey][key]), {}, {
            errorMessage: errorMessage
          }), _extends7)), _extends8));
        });
      },
      setFormPristine: function setFormPristine(formKey, key, isPristine) {
        return formState[formKey] && _setFormState(function (prevState) {
          var _extends9, _extends10;

          return _extends(_extends({}, prevState), {}, (_extends10 = {}, _extends10[formKey] = _extends(_extends({}, prevState[formKey]), {}, (_extends9 = {}, _extends9[key] = _extends(_extends({}, prevState[formKey][key]), {}, {
            isPristine: isPristine
          }), _extends9)), _extends10));
        });
      },
      setFormOptions: function setFormOptions(formKey, key, newOptions, callback) {
        if (!formState[formKey]) {
          return;
        }

        var newState = function newState() {
          var _extends11, _extends12;

          var options = newOptions.map(function (option) {
            return option.value;
          });
          var changedOptions = formState[formKey][key].options.map(function (option) {
            return _extends(_extends({}, option), {}, {
              isSelected: options.includes(option.value)
            });
          });
          return _extends(_extends({}, formState), {}, (_extends12 = {}, _extends12[formKey] = _extends(_extends({}, formState[formKey]), {}, (_extends11 = {}, _extends11[key] = _extends(_extends({}, formState[formKey][key]), {}, {
            options: changedOptions
          }), _extends11)), _extends12));
        };

        _setFormState(function (prevState) {
          var _extends13, _extends14;

          var options = newOptions.map(function (option) {
            return option.value;
          });
          var changedOptions = prevState[formKey][key].options.map(function (option) {
            return _extends(_extends({}, option), {}, {
              isSelected: options.includes(option.value)
            });
          });

          if (onChangeForm[formKey] && onChangeForm[formKey][key]) {
            onChangeForm[formKey][key](changedOptions);
          }

          return _extends(_extends({}, prevState), {}, (_extends14 = {}, _extends14[formKey] = _extends(_extends({}, prevState[formKey]), {}, (_extends13 = {}, _extends13[key] = _extends(_extends({}, prevState[formKey][key]), {}, {
            options: changedOptions
          }), _extends13)), _extends14));
        });

        gUtils.G.ifDefined(callback, function (fn) {
          return fn(newState()[formKey]);
        });
      },
      setFormField: function setFormField(formKey, key, field) {
        if (formState[formKey] && formState[formKey][key]) {
          _setFormState(function (prevState) {
            var _extends15, _extends16;

            return _extends(_extends({}, prevState), {}, (_extends16 = {}, _extends16[formKey] = _extends(_extends({}, prevState[formKey]), {}, (_extends15 = {}, _extends15[key] = _extends(_extends(_extends({
              type: formState[formKey][key].type
            }, formState[formKey][key]), field), {}, {
              options: field.options || (formState[formKey][key].type === FormFieldType.Picker ? formState[formKey][key].options : [])
            }), _extends15)), _extends16));
          });
        }
      },
      getFormField: function getFormField(formKey, key) {
        if (formState[formKey] && formState[formKey][key]) {
          return formState[formKey][key];
        }

        return {};
      },
      onFormFieldChange: function onFormFieldChange(formKey, formFieldName, onChange) {
        React.useEffect(function () {
          setOnChangeForm(function (prevState) {
            var _extends17, _extends18;

            return _extends(_extends({}, prevState), {}, (_extends18 = {}, _extends18[formKey] = _extends(_extends({}, prevState[formKey]), {}, (_extends17 = {}, _extends17[formFieldName] = onChange, _extends17)), _extends18));
          });
        }, [formState]);
      },
      clearFormStore: function clearFormStore(formKey) {
        _setFormState(function (prevState) {
          var _extends19;

          return _extends(_extends({}, prevState), {}, (_extends19 = {}, _extends19[formKey] = {}, _extends19));
        });

        setOnChangeForm(function (prevState) {
          var _extends20;

          return _extends(_extends({}, prevState), {}, (_extends20 = {}, _extends20[formKey] = {}, _extends20));
        });
      }
    },
    state: {
      formState: formState
    }
  };
};

var configStore = function configStore() {
  var _useState = React.useState({}),
      configStore = _useState[0],
      _setConfig = _useState[1];

  var _useState2 = React.useState({}),
      configOnUpdate = _useState2[0],
      setConfigOnUpdate = _useState2[1];

  return {
    actions: {
      setConfig: function setConfig(key, newConfig) {
        return _setConfig(function (prevState) {
          var _extends2;

          return _extends(_extends({}, prevState), {}, (_extends2 = {}, _extends2[key] = newConfig, _extends2));
        });
      },
      clearConfigStore: function clearConfigStore(formKey) {
        return _setConfig(function (prevState) {
          var _extends3;

          return _extends(_extends({}, prevState), {}, (_extends3 = {}, _extends3[formKey] = {}, _extends3));
        });
      },
      setOnUpdate: function setOnUpdate(key, onUpdate) {
        return onUpdate && setConfigOnUpdate(function (prevState) {
          var _extends4;

          return _extends(_extends({}, prevState), {}, (_extends4 = {}, _extends4[key] = onUpdate, _extends4));
        });
      }
    },
    state: {
      configStore: configStore,
      configOnUpdate: configOnUpdate
    }
  };
};

var formBuilderStores = [configStore, formStore];

var useValidate = function useValidate() {
  var form = outstated.useStore(formStore);
  var config = outstated.useStore(configStore);
  return {
    validateField: function validateField(formName, key, value) {
      var field = config.state.configStore && config.state.configStore[formName] && config.state.configStore[formName][key];

      if (!field.isRequired && value.length === 0) {
        return form.actions.setFormError(formName, key, undefined);
      }

      if (field === null || field === void 0 ? void 0 : field.validationRules) {
        var validated = field.validationRules.map(function (rule) {
          return rule.validationFunction(value, form.state.formState[formName]) ? rule.errorMessage : undefined;
        });

        var _validated$filter = validated.filter(function (value) {
          return value;
        }),
            errorMessage = _validated$filter[0];

        form.actions.setFormError(formName, key, errorMessage);
      }
    },
    validateCheckBox: function validateCheckBox(formName, key, value) {
      var field = config.state.configStore && config.state.configStore[formName] && config.state.configStore[formName][key];

      if (field === null || field === void 0 ? void 0 : field.validationRules) {
        var _field$validationRule = field.validationRules,
            rule = _field$validationRule[0];
        var errorMessage = rule.validationFunction(value, form.state.formState[formName]) ? rule.errorMessage : undefined;
        form.actions.setFormError(formName, key, errorMessage);
      }
    },
    validatePicker: function validatePicker(formName, key, options) {
      var field = config.state.configStore && config.state.configStore[formName] && config.state.configStore[formName][key];
      var validated = (field === null || field === void 0 ? void 0 : field.validationRules) && field.validationRules.map(function (rule) {
        return rule.validationFunction(options, form.state.formState[formName]) ? rule.errorMessage : undefined;
      });

      var _ref = validated || [undefined].filter(function (value) {
        return value;
      }),
          errorMessage = _ref[0];

      var isAnyOptionSelected = (field === null || field === void 0 ? void 0 : field.options) && field.options.some(function (option) {
        return option.isSelected;
      });

      if ((field === null || field === void 0 ? void 0 : field.isRequired) && isAnyOptionSelected) {
        return form.actions.setFormError(formName, key, errorMessage);
      }

      form.actions.setFormError(formName, key, errorMessage);
    },
    validateForm: function validateForm(formName, shouldUpdateStore) {
      if (shouldUpdateStore === void 0) {
        shouldUpdateStore = true;
      }

      return form.state.formState[formName] ? gUtils.G.toPairs(form.state.formState[formName]).map(function (_ref2) {
        var key = _ref2[0],
            formState = _ref2[1];
        var configField = config.state.configStore && config.state.configStore[formName][key];

        if ((configField === null || configField === void 0 ? void 0 : configField.validationRules) && formState.type === FormFieldType.Input) {
          var value = formState.value;

          if (!formState.isRequired && value === '') {
            return undefined;
          }

          var validated = configField.validationRules.map(function (rule) {
            return rule.validationFunction(value, form.state.formState[formName]) ? rule.errorMessage : undefined;
          });

          var _validated$filter2 = validated.filter(function (value) {
            return value;
          }),
              errorMessage = _validated$filter2[0];

          if (shouldUpdateStore) {
            form.actions.setFormError(formName, key, errorMessage);
          }

          return errorMessage;
        }

        if ((configField === null || configField === void 0 ? void 0 : configField.validationRules) && formState.type === FormFieldType.CheckBox) {
          var _value = formState.value;

          if (!formState.isRequired) {
            return undefined;
          }

          var _configField$validati = configField.validationRules,
              rule = _configField$validati[0];

          var _errorMessage = rule.validationFunction(_value, form.state.formState[formName]) ? rule.errorMessage : undefined;

          if (shouldUpdateStore) {
            form.actions.setFormError(formName, key, _errorMessage);
          }

          return _errorMessage;
        }

        if ((configField === null || configField === void 0 ? void 0 : configField.validationRules) && formState.type === FormFieldType.Picker) {
          var options = formState.options;

          if (!formState.isRequired) {
            return undefined;
          }

          var _validated = configField.validationRules.map(function (rule) {
            return rule.validationFunction(options, form.state.formState[formName]) ? rule.errorMessage : undefined;
          });

          var _validated$filter3 = _validated.filter(function (value) {
            return value;
          }),
              _errorMessage2 = _validated$filter3[0];

          if (shouldUpdateStore) {
            form.actions.setFormError(formName, key, _errorMessage2);
          }

          return _errorMessage2;
        }
      }) : [];
    }
  };
};

var useBlur = function useBlur() {
  var form = outstated.useStore(formStore);
  var config = outstated.useStore(configStore);

  var _useValidate = useValidate(),
      validateField = _useValidate.validateField;

  return {
    onInputBlur: function onInputBlur(formName, key, value) {
      var field = form.state.formState[formName][key];
      var configField = config.state.configStore && config.state.configStore[formName][key];

      if (field.isRequired || value !== (configField === null || configField === void 0 ? void 0 : configField.value)) {
        form.actions.setFormPristine(formName, key, false);
      }

      validateField(formName, key, value);
    }
  };
};

var useChange = function useChange() {
  var _useStore = outstated.useStore(formStore),
      state = _useStore.state,
      actions = _useStore.actions;

  var form = outstated.useStore(configStore);

  var _useValidate = useValidate(),
      validateField = _useValidate.validateField,
      validateCheckBox = _useValidate.validateCheckBox,
      validatePicker = _useValidate.validatePicker;

  return {
    onInputChange: function onInputChange(formName, key, value, callback) {
      var field = state.formState[formName][key];
      var configField = form.state.configStore && form.state.configStore[formName] && form.state.configStore[formName][key];
      var parsedValue = (configField === null || configField === void 0 ? void 0 : configField.liveParser) ? configField.liveParser(value) : value;

      if (typeof parsedValue !== 'string') {
        throw new Error('liveParser must return string on input');
      }

      var shouldValidateField = field.errorMessage || !field.isPristine || configField.forceLiveValidate || configField.validationRules;

      if (shouldValidateField) {
        validateField(formName, key, parsedValue);
      }

      actions.setFormValue(formName, key, parsedValue, callback);
    },
    onCheckboxChange: function onCheckboxChange(formName, key, callback) {
      var field = state.formState[formName][key];
      var configField = form.state.configStore && form.state.configStore[formName] && form.state.configStore[formName][key];
      var parsedValue = (configField === null || configField === void 0 ? void 0 : configField.liveParser) ? configField.liveParser(!field.value) : !field.value;

      if (typeof parsedValue !== 'boolean') {
        throw new Error('liveParser must return boolean on checkbox');
      }

      if (field.isRequired && !field.isPristine || field.errorMessage || configField.validationRules) {
        validateCheckBox(formName, key, parsedValue);
      }

      actions.setFormValue(formName, key, parsedValue, callback);
    },
    onPickerChange: function onPickerChange(formName, key, options, callback) {
      var configField = form.state.configStore && form.state.configStore[formName] && form.state.configStore[formName][key];
      var parsedValue = (configField === null || configField === void 0 ? void 0 : configField.liveParser) ? configField.liveParser(options) : options;

      if (!gUtils.G.is(Array, parsedValue)) {
        throw new Error('liveParser must return array on picker');
      }

      validatePicker(formName, key, options);
      actions.setFormOptions(formName, key, options, callback);
    }
  };
};

var useEvents = function useEvents() {
  var _useBlur = useBlur(),
      onInputBlur = _useBlur.onInputBlur;

  var _useChange = useChange(),
      onInputChange = _useChange.onInputChange,
      onCheckboxChange = _useChange.onCheckboxChange,
      onPickerChange = _useChange.onPickerChange;

  return {
    input: {
      onBlur: onInputBlur,
      onChange: onInputChange
    },
    checkBox: {
      onChange: onCheckboxChange
    },
    picker: {
      onChange: onPickerChange
    }
  };
};

var prepareFormInitialState = function prepareFormInitialState(formConfig, clearForm) {
  if (clearForm === void 0) {
    clearForm = false;
  }

  var configToPairs = gUtils.G.toPairs(formConfig).map(function (_ref) {
    var fieldName = _ref[0],
        config = _ref[1];

    if ((config === null || config === void 0 ? void 0 : config.isRequired) && !(config === null || config === void 0 ? void 0 : config.validationRules)) {
      throw new Error('validationRules are required if field isRequired  ');
    }

    if (config.type === FormFieldType.Input) {
      return [fieldName, {
        value: clearForm ? '' : config.value || '',
        isRequired: (config === null || config === void 0 ? void 0 : config.isRequired) || false,
        isPristine: true,
        disabled: (config === null || config === void 0 ? void 0 : config.disabled) || false,
        type: config.type,
        errorMessage: undefined
      }];
    }

    if (config.type === FormFieldType.CheckBox) {
      return [fieldName, {
        value: clearForm ? false : config.value || false,
        isRequired: (config === null || config === void 0 ? void 0 : config.isRequired) || false,
        isPristine: true,
        disabled: (config === null || config === void 0 ? void 0 : config.disabled) || false,
        type: config.type,
        errorMessage: undefined
      }];
    }

    if (config.type === FormFieldType.Picker) {
      var _config$options;

      return [fieldName, {
        isRequired: (config === null || config === void 0 ? void 0 : config.isRequired) || false,
        isPristine: true,
        disabled: (config === null || config === void 0 ? void 0 : config.disabled) || false,
        type: config.type,
        errorMessage: undefined,
        options: clearForm ? ((_config$options = config.options) === null || _config$options === void 0 ? void 0 : _config$options.map(function (option) {
          return _extends(_extends({}, option), {}, {
            isSelected: false
          });
        })) || [] : config.options || []
      }];
    }
  });
  return gUtils.G.fromPairs(configToPairs);
};
var parseForm = function parseForm(state) {
  return state && gUtils.G.toPairs(state).reduce(function (acc, _ref2) {
    var key = _ref2[0],
        object = _ref2[1];

    if (object.type === FormFieldType.Input || object.type === FormFieldType.CheckBox) {
      var _extends2;

      var value = object.value;
      return _extends(_extends({}, acc), {}, (_extends2 = {}, _extends2[key] = value, _extends2));
    }

    if (object.type === FormFieldType.Picker) {
      var _extends3;

      var options = object.options.filter(function (option) {
        return option.isSelected;
      }).map(function (option) {
        return option.value;
      });
      return _extends(_extends({}, acc), {}, (_extends3 = {}, _extends3[key] = options, _extends3));
    }

    return acc;
  }, {});
};

var renderForm = function renderForm(children, formName) {
  if (!children) {
    throw new Error('children are mandatory');
  }

  return React__default.Children.map(children, function (child) {
    return renderChild(child, formName);
  });
};

var renderChild = function renderChild(child, formName) {
  if (typeof child === 'string' || typeof child === 'number' || typeof child === null) {
    return child;
  }

  var _useStore = outstated.useStore(formStore),
      state = _useStore.state;

  var _useStore2 = outstated.useStore(configStore),
      configOnUpdate = _useStore2.state.configOnUpdate; // tslint:disable-next-line:no-any


  var reactElementChild = child;

  if (reactElementChild.type === Input) {
    var _useEvents = useEvents(),
        input = _useEvents.input;

    var inputChild = child;
    var key = inputChild.props.formFieldName;
    var formState = state.formState[formName];
    var inputState = formState ? formState[key] : undefined;
    return React__default.cloneElement(inputChild, _extends(_extends({}, inputChild.props), {}, {
      component: function component() {
        return inputChild.props.component({
          value: (inputState === null || inputState === void 0 ? void 0 : inputState.value) || '',
          onChangeText: function onChangeText(text) {
            return input.onChange(formName, key, text, function (state) {
              gUtils.G.ifDefined(configOnUpdate[formName], function (fn) {
                return fn(parseForm(state));
              });
            });
          },
          onBlur: function onBlur() {
            return input.onBlur(formName, key, (inputState === null || inputState === void 0 ? void 0 : inputState.value) || '');
          },
          errorMessage: inputState === null || inputState === void 0 ? void 0 : inputState.errorMessage,
          disabled: (inputState === null || inputState === void 0 ? void 0 : inputState.disabled) || false,
          isPristine: (inputState === null || inputState === void 0 ? void 0 : inputState.isPristine) || true
        });
      }
    }));
  }

  if (reactElementChild.type === CheckBox) {
    var _useEvents2 = useEvents(),
        checkBox = _useEvents2.checkBox;

    var checkBoxChild = child;
    var _key = checkBoxChild.props.formFieldName;
    var _formState = state.formState[formName];
    var checkBoxState = _formState ? _formState[_key] : undefined;
    return React__default.cloneElement(checkBoxChild, _extends(_extends({}, checkBoxChild.props), {}, {
      component: function component() {
        return checkBoxChild.props.component({
          value: (checkBoxState === null || checkBoxState === void 0 ? void 0 : checkBoxState.value) || false,
          onChange: function onChange() {
            return checkBox.onChange(formName, _key, function (state) {
              gUtils.G.ifDefined(configOnUpdate[formName], function (fn) {
                return fn(parseForm(state));
              });
            });
          },
          errorMessage: checkBoxState === null || checkBoxState === void 0 ? void 0 : checkBoxState.errorMessage,
          disabled: (checkBoxState === null || checkBoxState === void 0 ? void 0 : checkBoxState.disabled) || false,
          isPristine: (checkBoxState === null || checkBoxState === void 0 ? void 0 : checkBoxState.isPristine) || true
        });
      }
    }));
  }

  if (reactElementChild.type === Picker) {
    var _useEvents3 = useEvents(),
        picker = _useEvents3.picker;

    var pickerChild = child;
    var _key2 = pickerChild.props.formFieldName;
    var _formState2 = state.formState[formName];
    var pickerState = _formState2 ? _formState2[_key2] : undefined;
    return React__default.cloneElement(pickerChild, _extends(_extends({}, pickerChild.props), {}, {
      component: function component() {
        return pickerChild.props.component({
          onChange: function onChange(options) {
            return picker.onChange(formName, _key2, options, function (state) {
              gUtils.G.ifDefined(configOnUpdate[formName], function (fn) {
                return fn(parseForm(state));
              });
            });
          },
          errorMessage: pickerState === null || pickerState === void 0 ? void 0 : pickerState.errorMessage,
          disabled: (pickerState === null || pickerState === void 0 ? void 0 : pickerState.disabled) || false,
          isPristine: (pickerState === null || pickerState === void 0 ? void 0 : pickerState.isPristine) || true,
          options: (pickerState === null || pickerState === void 0 ? void 0 : pickerState.options) || []
        });
      }
    }));
  }

  var reactElementChildren = reactElementChild.props.children;

  if (reactElementChildren) {
    var newChildren = React__default.Children.map(reactElementChildren, function (child) {
      return renderChild(child, formName);
    });
    return React__default.cloneElement(reactElementChild, reactElementChild.props, newChildren);
  }

  return reactElementChild;
};

var useForm = function useForm(_ref) {
  var formName = _ref.formName,
      formConfig = _ref.formConfig,
      onError = _ref.onError,
      onSuccess = _ref.onSuccess,
      onUpdate = _ref.onUpdate;

  var _useStore = outstated.useStore(formStore),
      state = _useStore.state,
      actions = _useStore.actions;

  var config = outstated.useStore(configStore);

  var _useValidate = useValidate(),
      validateForm = _useValidate.validateForm;

  React.useEffect(function () {
    var formState = prepareFormInitialState(formConfig);
    config.actions.setConfig(formName, formConfig);
    config.actions.setOnUpdate(formName, onUpdate);
    actions.setFormState(formName, formState);
    return function () {
      config.actions.clearConfigStore(formName);
      actions.clearFormStore(formName);
    };
  }, []);
  return {
    submitForm: function submitForm() {
      var validated = validateForm(formName);
      var hasAnyError = validated.some(function (value) {
        return value;
      });

      if (hasAnyError) {
        return gUtils.G.ifDefined(onError, function (fn) {
          return fn(validated);
        });
      }

      var parsedForm = parseForm(state.formState[formName]);
      return gUtils.G.ifDefined(onSuccess, function (fn) {
        return fn(parsedForm);
      });
    },
    hasChanges: state.formState[formName] && gUtils.G.toPairs(state.formState[formName]).some(function (_ref2) {
      var object = _ref2[1];
      return !object.isPristine;
    }),
    setField: function setField(formFieldName, field) {
      return actions.setFormField(formName, formFieldName, field);
    },
    isFormValid: !validateForm(formName, false).some(function (error) {
      return error;
    }),
    getField: function getField(formFieldName) {
      return actions.getFormField(formName, formFieldName);
    },
    subscribe: function subscribe(formFieldName) {
      return {
        onChange: function onChange(_onChange) {
          return actions.onFormFieldChange(formName, formFieldName, _onChange);
        }
      };
    },
    restoreToInitial: function restoreToInitial() {
      if (config.state.configStore) {
        var newState = prepareFormInitialState(config.state.configStore[formName]);
        actions.setFormState(formName, newState);
        gUtils.G.ifDefined(onUpdate, function (fn) {
          return fn(parseForm(newState));
        });
      }
    },
    clearForm: function clearForm() {
      if (config.state.configStore) {
        var newState = prepareFormInitialState(config.state.configStore[formName], true);
        actions.setFormState(formName, newState);
        gUtils.G.ifDefined(onUpdate, function (fn) {
          return fn(parseForm(newState));
        });
      }
    },
    isFormReady: gUtils.G.hasKeys(state.formState[formName])
  };
};

var Form = function Form(_ref) {
  var children = _ref.children,
      formName = _ref.formName;
  return React__default.createElement(React.Fragment, null, renderForm(children, formName));
};

var FormProvider = function FormProvider(_ref) {
  var children = _ref.children;
  return React__default.createElement(outstated.Provider, {
    stores: formBuilderStores
  }, children);
};

exports.Field = index;
exports.Form = Form;
exports.FormProvider = FormProvider;
exports.FormTypes = index$1;
exports.useForm = useForm;
//# sourceMappingURL=react-form-builder.cjs.development.js.map

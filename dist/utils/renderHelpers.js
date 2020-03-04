"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _outstated = require("outstated");

var _stateUtils = require("./stateUtils");

var _hooks = require("../hooks");

var _stores = require("../stores");

var _components = require("../components");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const renderForm = (children, formConfig, onSuccess, onError) => {
  if (!children) {
    throw new Error('children are mandatory');
  }

  if (!formConfig) {
    throw new Error('form config is required');
  }

  const {
    state,
    actions
  } = (0, _outstated.useStore)(_stores.configStore);
  const form = (0, _outstated.useStore)(_stores.formStore);
  (0, _react.useEffect)(() => {
    const formState = (0, _stateUtils.prepareFormInitialState)(formConfig);
    actions.setConfig(formConfig);
    actions.setErrorFunction(() => onError);
    actions.setSuccessFunction(() => onSuccess);
    form.actions.setFormState(formState);
  }, []);
  (0, _react.useEffect)(() => {
    if (!state.config) {
      return;
    }

    const {
      newConfig,
      hasChanges
    } = (0, _stateUtils.handleFormConfigChange)(state.config, formConfig);

    if (hasChanges) {
      const newState = (0, _stateUtils.prepareFormInitialState)(formConfig, form.state.formState);
      actions.setConfig(newConfig);
      form.actions.setFormState(newState);
    }
  }, [formConfig, form]);
  return _react.default.Children.map(children, renderChild);
};

exports.renderForm = renderForm;

const renderChild = child => {
  if (typeof child === 'string' || typeof child === 'number' || typeof child === null) {
    return child;
  } // tslint:disable-next-line:no-any


  const reactElementChild = child;

  if (reactElementChild.type === _components.Input) {
    const {
      state
    } = (0, _outstated.useStore)(_stores.formStore);
    const {
      input
    } = (0, _hooks.useEvents)();
    const inputChild = child;
    const key = inputChild.props.formFieldName;
    const inputState = state.formState[key];
    return _react.default.cloneElement(inputChild, { ...inputChild.props,
      component: () => inputChild.props.component({
        value: inputState?.value || '',
        onChangeText: text => input.onChange(key, text),
        onBlur: () => input.onBlur(key, inputState.value),
        errorMessage: inputState?.errorMessage,
        disabled: inputState?.disabled,
        isPristine: inputState?.isPristine
      })
    });
  }

  if (reactElementChild.type === _components.CheckBox) {
    const {
      state
    } = (0, _outstated.useStore)(_stores.formStore);
    const {
      checkBox
    } = (0, _hooks.useEvents)();
    const checkBoxChild = child;
    const key = checkBoxChild.props.formFieldName;
    const checkBoxState = state.formState[key];
    return _react.default.cloneElement(checkBoxChild, { ...checkBoxChild.props,
      component: () => checkBoxChild.props.component({
        value: checkBoxState?.value || false,
        onChange: () => checkBox.onChange(key),
        errorMessage: checkBoxState?.errorMessage,
        disabled: checkBoxState?.disabled,
        isPristine: checkBoxState?.isPristine
      })
    });
  }

  if (reactElementChild.type === _components.Picker) {
    const {
      state
    } = (0, _outstated.useStore)(_stores.formStore);
    const {
      picker
    } = (0, _hooks.useEvents)();
    const pickerChild = child;
    const key = pickerChild.props.formFieldName;
    const pickerState = state.formState[key];
    return _react.default.cloneElement(pickerChild, { ...pickerChild.props,
      component: () => pickerChild.props.component({
        onChange: options => picker.onChange(key, options),
        errorMessage: pickerState?.errorMessage,
        disabled: pickerState?.disabled,
        isPristine: pickerState?.isPristine,
        options: pickerState?.options || []
      })
    });
  }

  const reactElementChildren = reactElementChild.props.children;

  if (reactElementChildren) {
    const newChildren = _react.default.Children.map(reactElementChildren, renderChild);

    return _react.default.cloneElement(reactElementChild, reactElementChild.props, newChildren);
  }

  return reactElementChild;
};
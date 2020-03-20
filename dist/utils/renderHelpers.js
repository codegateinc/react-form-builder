"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderForm = void 0;

var _react = _interopRequireDefault(require("react"));

var _outstated = require("outstated");

var _hooks = require("../hooks");

var _stores = require("../stores");

var _components = require("../components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const renderForm = (children, formName) => {
  if (!children) {
    throw new Error('children are mandatory');
  }

  return _react.default.Children.map(children, child => renderChild(child, formName));
};

exports.renderForm = renderForm;

const renderChild = (child, formName) => {
  if (typeof child === 'string' || typeof child === 'number' || typeof child === null) {
    return child;
  }

  const {
    state
  } = (0, _outstated.useStore)(_stores.formStore); // tslint:disable-next-line:no-any

  const reactElementChild = child;

  if (reactElementChild.type === _components.Input) {
    const {
      input
    } = (0, _hooks.useEvents)();
    const inputChild = child;
    const key = inputChild.props.formFieldName;
    const formState = state.formState[formName];
    const inputState = formState ? formState[key] : undefined;
    return _react.default.cloneElement(inputChild, { ...inputChild.props,
      component: () => inputChild.props.component({
        value: inputState?.value || '',
        onChangeText: text => input.onChange(formName, key, text),
        onBlur: () => input.onBlur(formName, key, inputState?.value || ''),
        errorMessage: inputState?.errorMessage,
        disabled: inputState?.disabled || false,
        isPristine: inputState?.isPristine || true
      })
    });
  }

  if (reactElementChild.type === _components.CheckBox) {
    const {
      checkBox
    } = (0, _hooks.useEvents)();
    const checkBoxChild = child;
    const key = checkBoxChild.props.formFieldName;
    const formState = state.formState[formName];
    const checkBoxState = formState ? formState[key] : undefined;
    return _react.default.cloneElement(checkBoxChild, { ...checkBoxChild.props,
      component: () => checkBoxChild.props.component({
        value: checkBoxState?.value || false,
        onChange: () => checkBox.onChange(formName, key),
        errorMessage: checkBoxState?.errorMessage,
        disabled: checkBoxState?.disabled || false,
        isPristine: checkBoxState?.isPristine || true
      })
    });
  }

  if (reactElementChild.type === _components.Picker) {
    const {
      picker
    } = (0, _hooks.useEvents)();
    const pickerChild = child;
    const key = pickerChild.props.formFieldName;
    const formState = state.formState[formName];
    const pickerState = formState ? formState[key] : undefined;
    return _react.default.cloneElement(pickerChild, { ...pickerChild.props,
      component: () => pickerChild.props.component({
        onChange: options => picker.onChange(formName, key, options),
        errorMessage: pickerState?.errorMessage,
        disabled: pickerState?.disabled || false,
        isPristine: pickerState?.isPristine || true,
        options: pickerState?.options || []
      })
    });
  }

  const reactElementChildren = reactElementChild.props.children;

  if (reactElementChildren) {
    const newChildren = _react.default.Children.map(reactElementChildren, child => renderChild(child, formName));

    return _react.default.cloneElement(reactElementChild, reactElementChild.props, newChildren);
  }

  return reactElementChild;
};
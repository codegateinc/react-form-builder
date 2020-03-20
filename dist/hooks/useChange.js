"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChange = void 0;

var _outstated = require("outstated");

var _gUtils = require("@codegateinc/g-utils");

var _useValidate = require("./useValidate");

var _stores = require("../stores");

const useChange = () => {
  const {
    state,
    actions
  } = (0, _outstated.useStore)(_stores.formStore);
  const form = (0, _outstated.useStore)(_stores.configStore);
  const {
    validateField,
    validateCheckBox,
    validatePicker
  } = (0, _useValidate.useValidate)();
  return {
    onInputChange: (formName, key, value) => {
      const field = state.formState[formName][key];
      const configField = form.state.configStore && form.state.configStore[formName] && form.state.configStore[formName][key];
      const parsedValue = configField?.liveParser ? configField.liveParser(value) : value;

      if (typeof parsedValue !== 'string') {
        throw new Error('liveParser must return string on input');
      }

      if (field.errorMessage || !field.isPristine) {
        validateField(formName, key, parsedValue);
      }

      actions.setFormValue(formName, key, parsedValue);
    },
    onCheckboxChange: (formName, key) => {
      const field = state.formState[formName][key];
      const configField = form.state.configStore && form.state.configStore[formName] && form.state.configStore[formName][key];
      const parsedValue = configField?.liveParser ? configField.liveParser(!field.value) : !field.value;

      if (typeof parsedValue !== 'boolean') {
        throw new Error('liveParser must return boolean on checkbox');
      }

      if (field.isRequired && !field.isPristine || field.errorMessage) {
        validateCheckBox(formName, key, parsedValue);
      }

      actions.setFormValue(formName, key, parsedValue);
    },
    onPickerChange: (formName, key, options) => {
      const configField = form.state.configStore && form.state.configStore[formName] && form.state.configStore[formName][key];
      const parsedValue = configField?.liveParser ? configField.liveParser(options) : options;

      if (!_gUtils.G.is(Array, parsedValue)) {
        throw new Error('liveParser must return array on picker');
      }

      validatePicker(formName, key, options);
      actions.setFormOptions(formName, key, options);
    }
  };
};

exports.useChange = useChange;
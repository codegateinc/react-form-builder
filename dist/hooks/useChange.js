"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChange = void 0;

var _outstated = require("outstated");

var _useValidate = require("./useValidate");

var _stores = require("../stores");

const useChange = () => {
  const {
    state,
    actions
  } = (0, _outstated.useStore)(_stores.formStore);
  const {
    validateField,
    validateCheckBox,
    validatePicker
  } = (0, _useValidate.useValidate)();
  return {
    onInputChange: (key, value) => {
      const field = state.formState[key];

      if (field.errorMessage || !field.isPristine) {
        validateField(key, value);
      }

      actions.setFormValue(key, value);
    },
    onCheckboxChange: key => {
      const field = state.formState[key];

      if (field.isRequired && !field.isPristine || field.errorMessage) {
        validateCheckBox(key, !field.value);
      }

      actions.setFormValue(key, !field.value);
      actions.setFormPristine(key, false);
    },
    onPickerChange: (key, options) => {
      validatePicker(key, options);
      actions.setFormOptions(key, options);
    }
  };
};

exports.useChange = useChange;
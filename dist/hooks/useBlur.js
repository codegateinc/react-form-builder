"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBlur = void 0;

var _outstated = require("outstated");

var _useValidate = require("./useValidate");

var _stores = require("../stores");

const useBlur = () => {
  const form = (0, _outstated.useStore)(_stores.formStore);
  const config = (0, _outstated.useStore)(_stores.configStore);
  const {
    validateField
  } = (0, _useValidate.useValidate)();
  return {
    onInputBlur: (formName, key, value) => {
      const field = form.state.formState[formName][key];
      const configField = config.state.configStore && config.state.configStore[formName][key];

      if (field.isRequired || value !== configField?.value) {
        form.actions.setFormPristine(formName, key, false);
      }

      validateField(formName, key, value);
    }
  };
};

exports.useBlur = useBlur;
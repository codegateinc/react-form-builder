"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareFormInitialState = void 0;

var _gUtils = require("@codegateinc/g-utils");

var _types = require("../types");

const prepareFormInitialState = formConfig => {
  const configToPairs = _gUtils.G.toPairs(formConfig).map(([fieldName, config]) => {
    if (config?.isRequired && !config?.validationRules) {
      throw new Error('validationRules are required if field isRequired  ');
    }

    if (config.type === _types.FormFieldType.Input || config.type === _types.FormFieldType.CheckBox) {
      return [fieldName, {
        value: config.value || '',
        isRequired: config?.isRequired || false,
        isPristine: true,
        disabled: config?.disabled || false,
        type: config.type,
        errorMessage: undefined
      }];
    }

    if (config.type === _types.FormFieldType.Picker) {
      return [fieldName, {
        isRequired: config?.isRequired || false,
        isPristine: true,
        disabled: config?.disabled || false,
        type: config.type,
        errorMessage: undefined,
        options: config.options
      }];
    }
  });

  return _gUtils.G.fromPairs(configToPairs);
};

exports.prepareFormInitialState = prepareFormInitialState;
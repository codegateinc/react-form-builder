"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useValidate = void 0;

var _outstated = require("outstated");

var _gUtils = require("@codegateinc/g-utils");

var _stores = require("../stores");

var _types = require("../types");

const useValidate = () => {
  const form = (0, _outstated.useStore)(_stores.formStore);
  const config = (0, _outstated.useStore)(_stores.configStore);
  return {
    validateField: (key, value) => {
      const field = config.state.config && config.state.config[key];

      if (field?.validationRules) {
        const validated = field.validationRules.map(rule => rule.validationFunction(value) ? rule.errorMessage : undefined);
        const [errorMessage] = validated.filter(value => value);
        form.actions.setFormError(key, errorMessage);
      }
    },
    validateCheckBox: (key, value) => {
      const field = config.state.config && config.state.config[key];

      if (field?.validationRules) {
        const [rule] = field.validationRules;
        const errorMessage = rule.validationFunction(value) ? rule.errorMessage : undefined;
        form.actions.setFormError(key, errorMessage);
      }
    },
    validatePicker: (key, options) => {
      const field = config.state.config && config.state.config[key];
      const validated = field?.validationRules && field.validationRules.map(rule => rule.validationFunction(options) ? rule.errorMessage : undefined);
      const [errorMessage] = validated || [undefined].filter(value => value);
      const isAnyOptionSelected = field?.options && field.options.some(option => option.isSelected);

      if (field?.isRequired && isAnyOptionSelected) {
        return form.actions.setFormError(key, errorMessage);
      }

      form.actions.setFormError(key, errorMessage);
    },
    validateForm: (shouldUpdateStore = true) => _gUtils.G.toPairs(form.state.formState).map(([key, formState]) => {
      const configField = config.state.config && config.state.config[key];

      if (configField?.validationRules && formState.type === _types.FormFieldType.Input) {
        const value = formState.value;
        const validated = configField.validationRules.map(rule => rule.validationFunction(value) ? rule.errorMessage : undefined);
        const [errorMessage] = validated.filter(value => value);

        if (shouldUpdateStore) {
          form.actions.setFormError(key, errorMessage);
        }

        return errorMessage;
      }

      if (configField?.validationRules && formState.type === _types.FormFieldType.CheckBox) {
        const value = formState.value;
        const [rule] = configField.validationRules;
        const errorMessage = rule.validationFunction(value) ? rule.errorMessage : undefined;

        if (shouldUpdateStore) {
          form.actions.setFormError(key, errorMessage);
        }

        return errorMessage;
      }

      if (configField?.validationRules && formState.type === _types.FormFieldType.Picker) {
        const options = formState.options;
        const validated = configField.validationRules.map(rule => rule.validationFunction(options) ? rule.errorMessage : undefined);
        const [errorMessage] = validated.filter(value => value);

        if (shouldUpdateStore) {
          form.actions.setFormError(key, errorMessage);
        }

        return errorMessage;
      }
    })
  };
};

exports.useValidate = useValidate;
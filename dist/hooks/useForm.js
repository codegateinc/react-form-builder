"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useForm = void 0;

var _outstated = require("outstated");

var _gUtils = require("@codegateinc/g-utils");

var _useValidate = require("./useValidate");

var _stores = require("../stores");

var _types = require("../types");

const useForm = () => {
  const {
    state,
    actions
  } = (0, _outstated.useStore)(_stores.formStore);
  const config = (0, _outstated.useStore)(_stores.configStore);
  const {
    validateForm
  } = (0, _useValidate.useValidate)();
  return {
    submitForm: () => {
      const validated = validateForm();
      const hasAnyError = validated.some(value => value);

      if (hasAnyError) {
        return _gUtils.G.ifDefined(config.state.errorFunction, _gUtils.G.call);
      }

      const parsedForm = _gUtils.G.toPairs(state.formState).reduce((acc, [key, object]) => {
        if (object.type === _types.FormFieldType.Input || object.type === _types.FormFieldType.CheckBox) {
          const value = object.value;
          return { ...acc,
            [key]: value
          };
        }

        if (object.type === _types.FormFieldType.Picker) {
          const options = object.options.filter(option => option.isSelected).map(option => option.value);
          return { ...acc,
            [key]: options
          };
        }

        return acc;
      }, {});

      return _gUtils.G.ifDefined(config.state.successFunction, fn => fn(parsedForm));
    },
    hasChanges: _gUtils.G.toPairs(state.formState).some(([key, object]) => !object.isPristine),
    setField: (formFieldName, field) => actions.setFormField(formFieldName, field),
    isFormValid: !validateForm(false).some(error => error)
  };
};

exports.useForm = useForm;
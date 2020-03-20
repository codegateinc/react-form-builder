"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useForm = void 0;

var _outstated = require("outstated");

var _gUtils = require("@codegateinc/g-utils");

var _useValidate = require("./useValidate");

var _utils = require("../utils");

var _stores = require("../stores");

var _types = require("../types");

var _react = require("react");

const useForm = ({
  formName,
  formConfig,
  onError,
  onSuccess
}) => {
  const {
    state,
    actions
  } = (0, _outstated.useStore)(_stores.formStore);
  const config = (0, _outstated.useStore)(_stores.configStore);
  const {
    validateForm
  } = (0, _useValidate.useValidate)();
  (0, _react.useEffect)(() => {
    const formState = (0, _utils.prepareFormInitialState)(formConfig);
    config.actions.setConfig(formName, formConfig);
    actions.setFormState(formName, formState);
    return () => {
      config.actions.clearConfigStore(formName);
      actions.clearFormStore(formName);
    };
  }, []);
  return {
    submitForm: () => {
      const validated = validateForm(formName);
      const hasAnyError = validated.some(value => value);

      if (hasAnyError) {
        return _gUtils.G.ifDefined(onError, _gUtils.G.call);
      }

      const parsedForm = state.formState[formName] && _gUtils.G.toPairs(state.formState[formName]).reduce((acc, [key, object]) => {
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

      return _gUtils.G.ifDefined(onSuccess, fn => fn(parsedForm));
    },
    hasChanges: state.formState[formName] && _gUtils.G.toPairs(state.formState[formName]).some(([key, object]) => !object.isPristine),
    setField: (formFieldName, field) => actions.setFormField(formName, formFieldName, field),
    isFormValid: !validateForm(formName, false).some(error => error),
    getField: formFieldName => actions.getFormField(formName, formFieldName),
    subscribe: formFieldName => ({
      onChange: onChange => actions.onFormFieldChange(formName, formFieldName, onChange)
    }),
    restoreToInitial: () => config.state.configStore && actions.setFormState(formName, (0, _utils.prepareFormInitialState)(config.state.configStore[formName])),
    isFormReady: _gUtils.G.hasKeys(state.formState[formName])
  };
};

exports.useForm = useForm;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleFormConfigChange = exports.prepareFormInitialState = void 0;

var _gUtils = require("@codegateinc/g-utils");

var _deepEqual = _interopRequireDefault(require("deep-equal"));

var _types = require("../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prepareFormInitialState = (formConfig, prevState) => {
  const configToPairs = _gUtils.G.toPairs(formConfig).map(([fieldName, config]) => {
    if (config?.isRequired && !config?.validationRules) {
      throw new Error('validationRules are required if field isRequired  ');
    }

    if (config.type === _types.FormFieldType.Input || config.type === _types.FormFieldType.CheckBox) {
      const prevField = prevState && prevState[fieldName];
      return [fieldName, {
        value: prevField?.value || config?.value || '',
        isRequired: config?.isRequired || false,
        isPristine: true,
        disabled: config.disabled && config.disabled() || false,
        type: config.type,
        errorMessage: undefined
      }];
    }

    if (config.type === _types.FormFieldType.Picker) {
      const prevField = prevState && prevState[fieldName];
      const areOptionsSame = config.options && config.options.every((option, index) => {
        const labelsAreTheSame = option.label === prevField?.options[index].label;
        const valuesAreTheSame = option.value === prevField?.options[index].value;
        return labelsAreTheSame && valuesAreTheSame;
      });
      return [fieldName, {
        isRequired: config?.isRequired || false,
        isPristine: true,
        disabled: config.disabled && config.disabled() || false,
        type: config.type,
        errorMessage: undefined,
        options: areOptionsSame ? prevField?.options : config.options
      }];
    }
  });

  return _gUtils.G.fromPairs(configToPairs);
};

exports.prepareFormInitialState = prepareFormInitialState;

const handleFormConfigChange = (prevConfig, formConfig) => {
  let hasChanges = false;

  const configToPairs = _gUtils.G.toPairs(prevConfig).map(([fieldName, config]) => {
    if (config?.isRequired && !config?.validationRules) {
      throw new Error('validationRules are required if field isRequired');
    }

    const checkedField = _gUtils.G.fromPairs(_gUtils.G.toPairs(config).map(([key, value]) => {
      const field = formConfig[fieldName];

      if (key === 'validationRules') {
        const validationRules = _gUtils.G.toPairs(value).map(([, rule], index) => {
          if (field.validationRules && rule.errorMessage !== field.validationRules[index].errorMessage) {
            hasChanges = true;
            return field.validationRules[index];
          }

          return rule;
        });

        return [key, validationRules];
      }

      if ((0, _deepEqual.default)(value, field[key])) {
        return [key, value];
      }

      hasChanges = true;
      return [key, field[key]];
    }));

    return [fieldName, checkedField];
  });

  return {
    hasChanges,
    newConfig: _gUtils.G.fromPairs(configToPairs)
  };
};

exports.handleFormConfigChange = handleFormConfigChange;
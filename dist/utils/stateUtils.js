import { G } from '@codegateinc/g-utils';
import equals from 'deep-equal';
import { FormFieldType } from '../types';
export const prepareFormInitialState = (formConfig, prevState) => {
  const configToPairs = G.toPairs(formConfig).map(([fieldName, config]) => {
    if (config?.isRequired && !config?.validationRules) {
      throw new Error('validationRules are required if field isRequired  ');
    }

    if (config.type === FormFieldType.Input || config.type === FormFieldType.CheckBox) {
      const prevField = prevState && prevState[fieldName];
      const areValuesSame = prevField?.value === config.value;
      return [fieldName, {
        value: areValuesSame ? prevField?.value : config.value || '',
        isRequired: config?.isRequired || false,
        isPristine: true,
        disabled: config?.disabled || false,
        type: config.type,
        errorMessage: undefined
      }];
    }

    if (config.type === FormFieldType.Picker) {
      const prevField = prevState && prevState[fieldName];
      const areOptionsSameCondition = G.all(G.isDefined(config.options), G.hasElements(config.options), G.hasElements((prevField?.options)));
      const areOptionsSame = areOptionsSameCondition && config.options.every((option, index) => {
        const areLabelsTheSame = option.label === prevField?.options[index].label;
        const areValuesTheSame = option.value === prevField?.options[index].value;
        const areSelectsTheSame = option.isSelected === prevField?.options[index].isSelected;
        return G.all(areLabelsTheSame, areValuesTheSame, areSelectsTheSame);
      });
      return [fieldName, {
        isRequired: config?.isRequired || false,
        isPristine: true,
        disabled: config?.disabled || false,
        type: config.type,
        errorMessage: undefined,
        options: areOptionsSame ? prevField?.options : config.options
      }];
    }
  });
  return G.fromPairs(configToPairs);
};
export const handleFormConfigChange = (prevConfig, formConfig) => {
  let hasChanges = false;
  const liveParserConfigKey = 'liveParser';
  const validationRulesConfigKey = 'validationRules';
  const configToPairs = G.toPairs(prevConfig).map(([fieldName, config]) => {
    if (config?.isRequired && !config?.validationRules) {
      throw new Error('validationRules are required if field isRequired');
    }

    const checkedField = G.fromPairs(G.toPairs(config).map(([key, value]) => {
      const field = formConfig[fieldName];

      if (!field) {
        return [key, value];
      }

      if (key === validationRulesConfigKey) {
        const validationRules = G.toPairs(value).map(([, rule], index) => {
          if (field.validationRules && rule.errorMessage !== field.validationRules[index].errorMessage) {
            hasChanges = true;
            return field.validationRules[index];
          }

          return rule;
        });
        return [key, validationRules];
      }

      if (equals(value, field[key]) || key === liveParserConfigKey) {
        return [key, value];
      }

      hasChanges = true;
      return [key, field[key]];
    }));
    return [fieldName, checkedField];
  });
  return {
    hasChanges,
    newConfig: G.fromPairs(configToPairs)
  };
};
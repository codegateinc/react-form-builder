import { G } from '@codegateinc/g-utils';
import { FormFieldType } from '../types';
export const prepareFormInitialState = formConfig => {
  const configToPairs = G.toPairs(formConfig).map(([fieldName, config]) => {
    if (config?.isRequired && !config?.validationRules) {
      throw new Error('validationRules are required if field isRequired  ');
    }

    if (config.type === FormFieldType.Input || config.type === FormFieldType.CheckBox) {
      return [fieldName, {
        value: config.value || '',
        isRequired: config?.isRequired || false,
        isPristine: true,
        disabled: config?.disabled || false,
        type: config.type,
        errorMessage: undefined
      }];
    }

    if (config.type === FormFieldType.Picker) {
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
  return G.fromPairs(configToPairs);
};
export const parseForm = state => state && G.toPairs(state).reduce((acc, [key, object]) => {
  if (object.type === FormFieldType.Input || object.type === FormFieldType.CheckBox) {
    const value = object.value;
    return { ...acc,
      [key]: value
    };
  }

  if (object.type === FormFieldType.Picker) {
    const options = object.options.filter(option => option.isSelected).map(option => option.value);
    return { ...acc,
      [key]: options
    };
  }

  return acc;
}, {});
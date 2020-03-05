import { useStore } from 'outstated';
import { G } from '@codegateinc/g-utils';
import { useValidate } from './useValidate';
import { configStore, formStore } from '../stores';
import { FormFieldType } from '../types';
export const useForm = () => {
  const {
    state,
    actions
  } = useStore(formStore);
  const config = useStore(configStore);
  const {
    validateForm
  } = useValidate();
  return {
    submitForm: () => {
      const validated = validateForm();
      const hasAnyError = validated.some(value => value);

      if (hasAnyError) {
        return G.ifDefined(config.state.errorFunction, G.call);
      }

      const parsedForm = G.toPairs(state.formState).reduce((acc, [key, object]) => {
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
      return G.ifDefined(config.state.successFunction, fn => fn(parsedForm));
    },
    hasChanges: G.toPairs(state.formState).some(([key, object]) => !object.isPristine),
    setField: (formFieldName, field) => actions.setFormField(formFieldName, field),
    isFormValid: !validateForm(false).some(error => error)
  };
};
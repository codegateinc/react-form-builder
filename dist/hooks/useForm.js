import { useStore } from 'outstated';
import { G } from '@codegateinc/g-utils';
import { useValidate } from './useValidate';
import { prepareFormInitialState } from '../utils';
import { configStore, formStore } from '../stores';
import { FormFieldType } from '../types';
export const useForm = formName => {
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
      const validated = validateForm(formName);
      const hasAnyError = validated.some(value => value);

      if (hasAnyError) {
        return G.ifDefined(config.state.configErrorFunction[formName], G.call);
      }

      const parsedForm = state.formState[formName] && G.toPairs(state.formState[formName]).reduce((acc, [key, object]) => {
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
      return G.ifDefined(config.state.configSuccessFunction[formName], fn => fn(parsedForm));
    },
    hasChanges: state.formState[formName] && G.toPairs(state.formState[formName]).some(([key, object]) => !object.isPristine),
    setField: (formFieldName, field) => actions.setFormField(formName, formFieldName, field),
    isFormValid: !validateForm(formName, false).some(error => error),
    getField: formFieldName => actions.getFormField(formName, formFieldName),
    subscribe: formFieldName => ({
      onChange: onChange => actions.onFormFieldChange(formName, formFieldName, onChange)
    }),
    restoreToInitial: () => config.state.configStore && actions.setFormState(formName, prepareFormInitialState(config.state.configStore[formName]))
  };
};
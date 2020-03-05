import { useStore } from 'outstated';
import { useValidate } from './useValidate';
import { formStore } from '../stores';
export const useChange = () => {
  const {
    state,
    actions
  } = useStore(formStore);
  const {
    validateField,
    validateCheckBox,
    validatePicker
  } = useValidate();
  return {
    onInputChange: (key, value) => {
      const field = state.formState[key];

      if (field.errorMessage || !field.isPristine) {
        validateField(key, value);
      }

      actions.setFormValue(key, value);
    },
    onCheckboxChange: key => {
      const field = state.formState[key];

      if (field.isRequired && !field.isPristine || field.errorMessage) {
        validateCheckBox(key, !field.value);
      }

      actions.setFormValue(key, !field.value);
      actions.setFormPristine(key, false);
    },
    onPickerChange: (key, options) => {
      validatePicker(key, options);
      actions.setFormOptions(key, options);
    }
  };
};
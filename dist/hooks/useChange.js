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
    onInputChange: (formName, key, value) => {
      const field = state.formState[formName][key];

      if (field.errorMessage || !field.isPristine) {
        validateField(formName, key, value);
      }

      actions.setFormValue(formName, key, value);
    },
    onCheckboxChange: (formName, key) => {
      const field = state.formState[formName][key];

      if (field.isRequired && !field.isPristine || field.errorMessage) {
        validateCheckBox(formName, key, !field.value);
      }

      actions.setFormValue(formName, key, !field.value);
      actions.setFormPristine(formName, key, false);
    },
    onPickerChange: (formName, key, options) => {
      validatePicker(formName, key, options);
      actions.setFormOptions(formName, key, options);
    }
  };
};
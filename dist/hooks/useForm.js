import { useStore } from 'outstated';
import { G } from '@codegateinc/g-utils';
import { useValidate } from './useValidate';
import { parseForm, prepareFormInitialState } from '../utils';
import { configStore, formStore } from '../stores';
import { useEffect } from 'react';
export const useForm = ({
  formName,
  formConfig,
  onError,
  onSuccess,
  onUpdate
}) => {
  const {
    state,
    actions
  } = useStore(formStore);
  const config = useStore(configStore);
  const {
    validateForm
  } = useValidate();
  useEffect(() => {
    const formState = prepareFormInitialState(formConfig);
    config.actions.setConfig(formName, formConfig);
    config.actions.setOnUpdate(formName, onUpdate);
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
        return G.ifDefined(onError, G.call);
      }

      const parsedForm = parseForm(state.formState[formName]);
      return G.ifDefined(onSuccess, fn => fn(parsedForm));
    },
    hasChanges: state.formState[formName] && G.toPairs(state.formState[formName]).some(([key, object]) => !object.isPristine),
    setField: (formFieldName, field) => actions.setFormField(formName, formFieldName, field),
    isFormValid: !validateForm(formName, false).some(error => error),
    getField: formFieldName => actions.getFormField(formName, formFieldName),
    subscribe: formFieldName => ({
      onChange: onChange => actions.onFormFieldChange(formName, formFieldName, onChange)
    }),
    restoreToInitial: () => {
      if (config.state.configStore) {
        const newState = prepareFormInitialState(config.state.configStore[formName]);
        actions.setFormState(formName, newState);
        G.ifDefined(onUpdate, fn => fn(parseForm(newState)));
      }
    },
    clearForm: () => {
      if (config.state.configStore) {
        const newState = prepareFormInitialState(config.state.configStore[formName], true);
        actions.setFormState(formName, newState);
        G.ifDefined(onUpdate, fn => fn(parseForm(newState)));
      }
    },
    isFormReady: G.hasKeys(state.formState[formName])
  };
};
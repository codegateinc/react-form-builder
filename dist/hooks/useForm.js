import { useStore } from 'outstated';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { G } from '@codegateinc/g-utils';
import { useValidate } from './useValidate';
import { prepareFormInitialState } from '../utils';
import { configStore, formStore } from '../stores';
import { FormFieldType } from '../types';
import { useEffect, useMemo } from 'react';
export const useForm = ({
  formName,
  formConfig,
  onError,
  onSuccess,
  debounce
}) => {
  const {
    state,
    actions
  } = useStore(formStore);
  const config = useStore(configStore);
  const {
    validateForm
  } = useValidate();
  const stream = new Subject();
  const parsedForm = useMemo(() => state.formState[formName] && G.toPairs(state.formState[formName]).reduce((acc, [key, object]) => {
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
  }, {}), [state]);
  useEffect(() => {
    stream.pipe(debounceTime(debounce || 0)).subscribe(() => {
      if (debounce && onSuccess) {
        onSuccess(parsedForm);
      }
    });
    return () => {
      stream.unsubscribe();
    };
  }, []);
  useEffect(() => stream.next(), [state]);
  useEffect(() => {
    const formState = prepareFormInitialState(formConfig);
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
        return G.ifDefined(onError, G.call);
      }

      return G.ifDefined(onSuccess, fn => fn(parsedForm));
    },
    hasChanges: state.formState[formName] && G.toPairs(state.formState[formName]).some(([key, object]) => !object.isPristine),
    setField: (formFieldName, field) => actions.setFormField(formName, formFieldName, field),
    isFormValid: !validateForm(formName, false).some(error => error),
    getField: formFieldName => actions.getFormField(formName, formFieldName),
    subscribe: formFieldName => ({
      onChange: onChange => actions.onFormFieldChange(formName, formFieldName, onChange)
    }),
    restoreToInitial: () => config.state.configStore && actions.setFormState(formName, prepareFormInitialState(config.state.configStore[formName])),
    isFormReady: G.hasKeys(state.formState[formName])
  };
};
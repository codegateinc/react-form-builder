import React, { useEffect } from 'react';
import { useStore } from 'outstated';
import { prepareFormInitialState, handleFormConfigChange } from './stateUtils';
import { useEvents } from '../hooks';
import { configStore, formStore } from '../stores';
import { CheckBox, Input, Picker } from '../components';
export const renderForm = (children, formConfig, onSuccess, onError) => {
  if (!children) {
    throw new Error('children are mandatory');
  }

  if (!formConfig) {
    throw new Error('form config is required');
  }

  const {
    state,
    actions
  } = useStore(configStore);
  const form = useStore(formStore);
  useEffect(() => {
    const formState = prepareFormInitialState(formConfig);
    actions.setConfig(formConfig);
    actions.setErrorFunction(() => onError);
    actions.setSuccessFunction(() => onSuccess);
    form.actions.setFormState(formState);
  }, []);
  useEffect(() => {
    if (!state.config) {
      return;
    }

    const {
      newConfig,
      hasChanges
    } = handleFormConfigChange(state.config, formConfig);

    if (hasChanges) {
      const newState = prepareFormInitialState(formConfig, form.state.formState);
      actions.setConfig(newConfig);
      form.actions.setFormState(newState);
    }
  }, [formConfig, form]);
  return React.Children.map(children, renderChild);
};

const renderChild = child => {
  if (typeof child === 'string' || typeof child === 'number' || typeof child === null) {
    return child;
  } // tslint:disable-next-line:no-any


  const reactElementChild = child;

  if (reactElementChild.type === Input) {
    const {
      state
    } = useStore(formStore);
    const {
      input
    } = useEvents();
    const inputChild = child;
    const key = inputChild.props.formFieldName;
    const inputState = state.formState[key];
    return React.cloneElement(inputChild, { ...inputChild.props,
      component: () => inputChild.props.component({
        value: inputState?.value || '',
        onChangeText: text => input.onChange(key, text),
        onBlur: () => input.onBlur(key, inputState.value),
        errorMessage: inputState?.errorMessage,
        disabled: inputState?.disabled,
        isPristine: inputState?.isPristine
      })
    });
  }

  if (reactElementChild.type === CheckBox) {
    const {
      state
    } = useStore(formStore);
    const {
      checkBox
    } = useEvents();
    const checkBoxChild = child;
    const key = checkBoxChild.props.formFieldName;
    const checkBoxState = state.formState[key];
    return React.cloneElement(checkBoxChild, { ...checkBoxChild.props,
      component: () => checkBoxChild.props.component({
        value: checkBoxState?.value || false,
        onChange: () => checkBox.onChange(key),
        errorMessage: checkBoxState?.errorMessage,
        disabled: checkBoxState?.disabled,
        isPristine: checkBoxState?.isPristine
      })
    });
  }

  if (reactElementChild.type === Picker) {
    const {
      state
    } = useStore(formStore);
    const {
      picker
    } = useEvents();
    const pickerChild = child;
    const key = pickerChild.props.formFieldName;
    const pickerState = state.formState[key];
    return React.cloneElement(pickerChild, { ...pickerChild.props,
      component: () => pickerChild.props.component({
        onChange: options => picker.onChange(key, options),
        errorMessage: pickerState?.errorMessage,
        disabled: pickerState?.disabled,
        isPristine: pickerState?.isPristine,
        options: pickerState?.options || []
      })
    });
  }

  const reactElementChildren = reactElementChild.props.children;

  if (reactElementChildren) {
    const newChildren = React.Children.map(reactElementChildren, renderChild);
    return React.cloneElement(reactElementChild, reactElementChild.props, newChildren);
  }

  return reactElementChild;
};
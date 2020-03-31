import { useEffect, useState } from 'react';
import { G } from '@codegateinc/g-utils';
import { FormFieldType } from '../../types';
export const formStore = () => {
  const [formState, setFormState] = useState({});
  const [onChangeForm, setOnChangeForm] = useState({});
  return {
    actions: {
      setFormState: (key, state) => setFormState(prevState => ({ ...prevState,
        [key]: state
      })),
      setFormValue: (formKey, key, value, callback) => {
        if (!formState[formKey]) {
          return;
        }

        const newState = { ...formState,
          [formKey]: { ...formState[formKey],
            [key]: { ...formState[formKey][key],
              value
            }
          }
        };
        setFormState(prevState => ({ ...prevState,
          [formKey]: { ...prevState[formKey],
            [key]: { ...prevState[formKey][key],
              value
            }
          }
        }));
        G.ifDefined(callback, fn => fn(newState[formKey]));

        if (onChangeForm[formKey] && onChangeForm[formKey][key]) {
          onChangeForm[formKey][key](value);
        }
      },
      setFormError: (formKey, key, errorMessage) => formState[formKey] && setFormState(prevState => ({ ...prevState,
        [formKey]: { ...prevState[formKey],
          [key]: { ...prevState[formKey][key],
            errorMessage
          }
        }
      })),
      setFormPristine: (formKey, key, isPristine) => formState[formKey] && setFormState(prevState => ({ ...prevState,
        [formKey]: { ...prevState[formKey],
          [key]: { ...prevState[formKey][key],
            isPristine
          }
        }
      })),
      setFormOptions: (formKey, key, newOptions, callback) => {
        if (!formState[formKey]) {
          return;
        }

        const newState = () => {
          const options = newOptions.map(option => option.value);
          const changedOptions = formState[formKey][key].options.map(option => ({ ...option,
            isSelected: options.includes(option.value)
          }));
          return { ...formState,
            [formKey]: { ...formState[formKey],
              [key]: { ...formState[formKey][key],
                options: changedOptions
              }
            }
          };
        };

        setFormState(prevState => {
          const options = newOptions.map(option => option.value);
          const changedOptions = prevState[formKey][key].options.map(option => ({ ...option,
            isSelected: options.includes(option.value)
          }));

          if (onChangeForm[formKey] && onChangeForm[formKey][key]) {
            onChangeForm[formKey][key](changedOptions);
          }

          return { ...prevState,
            [formKey]: { ...prevState[formKey],
              [key]: { ...prevState[formKey][key],
                options: changedOptions
              }
            }
          };
        });
        G.ifDefined(callback, fn => fn(newState()));
      },
      setFormField: (formKey, key, field) => {
        if (formState[formKey] && formState[formKey][key]) {
          setFormState(prevState => ({ ...prevState,
            [formKey]: { ...prevState[formKey],
              [key]: {
                type: formState[formKey][key].type,
                ...formState[formKey][key],
                ...field,
                options: field.options || (formState[formKey][key].type === FormFieldType.Picker ? formState[formKey][key].options : [])
              }
            }
          }));
        }
      },
      getFormField: (formKey, key) => {
        if (formState[formKey] && formState[formKey][key]) {
          return formState[formKey][key];
        }

        return {};
      },
      onFormFieldChange: (formKey, formFieldName, onChange) => {
        useEffect(() => {
          setOnChangeForm(prevState => ({ ...prevState,
            [formKey]: { ...prevState[formKey],
              [formFieldName]: onChange
            }
          }));
        }, [formState]);
      },
      clearFormStore: formKey => {
        setFormState(prevState => ({ ...prevState,
          [formKey]: {}
        }));
        setOnChangeForm(prevState => ({ ...prevState,
          [formKey]: {}
        }));
      }
    },
    state: {
      formState
    }
  };
};
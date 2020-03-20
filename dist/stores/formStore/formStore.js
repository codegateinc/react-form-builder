import { useEffect, useState } from 'react';
import { FormFieldType } from '../../types';
export const formStore = () => {
  const [formState, setFormState] = useState({});
  const [onChangeForm, setOnChangeForm] = useState({});
  return {
    actions: {
      setFormState: (key, state) => setFormState(prevState => ({ ...prevState,
        [key]: state
      })),
      setFormValue: (formKey, key, value) => {
        if (!formState[formKey]) {
          return;
        }

        setFormState(prevState => ({ ...prevState,
          [formKey]: { ...prevState[formKey],
            [key]: { ...prevState[formKey][key],
              value
            }
          }
        }));

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
      setFormOptions: (formKey, key, newOptions) => formState[formKey] && setFormState(prevState => {
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
      }),
      setFormField: (formKey, key, field) => {
        if (formState[formKey] && formState[formKey][key]) {
          setFormState(prevState => ({ ...prevState,
            [formKey]: { ...prevState[formKey],
              [key]: {
                type: formState[formKey][key].type,
                ...formState[formKey][key],
                ...field,
                options: field.options || (prevState[formKey][key].type === FormFieldType.Picker ? prevState[formKey][key].options : [])
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
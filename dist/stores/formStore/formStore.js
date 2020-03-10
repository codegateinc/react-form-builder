import { useState } from 'react';
export const formStore = () => {
  const [formState, setFormState] = useState({});
  return {
    actions: {
      setFormState: (key, state) => setFormState(prevState => ({ ...prevState,
        [key]: state
      })),
      setFormValue: (formKey, key, value) => setFormState(prevState => ({ ...prevState,
        [formKey]: { ...prevState[formKey],
          [key]: { ...prevState[formKey][key],
            value
          }
        }
      })),
      setFormError: (formKey, key, errorMessage) => formState[formKey] && setFormState(prevState => ({ ...prevState,
        [formKey]: { ...prevState[formKey],
          [key]: { ...prevState[formKey][key],
            errorMessage
          }
        }
      })),
      setFormPristine: (formKey, key, isPristine) => setFormState(prevState => ({ ...prevState,
        [formKey]: { ...prevState[formKey],
          [key]: { ...prevState[formKey][key],
            isPristine
          }
        }
      })),
      setFormOptions: (formKey, key, newOptions) => setFormState(prevState => {
        const options = newOptions.map(option => option.value);
        return { ...prevState,
          [formKey]: { ...prevState[formKey],
            [key]: { ...prevState[formKey][key],
              options: prevState[formKey][key].options.map(option => ({ ...option,
                isSelected: options.includes(option.value)
              }))
            }
          }
        };
      }),
      setFormField: (formKey, key, field) => setFormState(prevState => ({ ...prevState,
        [formKey]: { ...prevState[formKey],
          [key]: {
            type: field.type,
            isPristine: true,
            value: field.value || '',
            options: field.options || [],
            isRequired: field.isRequired || false,
            disabled: field.disabled && field.disabled() || false
          }
        }
      }))
    },
    state: {
      formState
    }
  };
};
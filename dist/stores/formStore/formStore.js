"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formStore = void 0;

var _react = require("react");

const formStore = () => {
  const [formState, setFormState] = (0, _react.useState)({});
  return {
    actions: {
      setFormState,
      setFormValue: (key, value) => setFormState(prevState => ({ ...prevState,
        [key]: { ...prevState[key],
          value
        }
      })),
      setFormError: (key, errorMessage) => setFormState(prevState => ({ ...prevState,
        [key]: { ...prevState[key],
          errorMessage
        }
      })),
      setFormPristine: (key, isPristine) => setFormState(prevState => ({ ...prevState,
        [key]: { ...prevState[key],
          isPristine
        }
      })),
      setFormOptions: (key, newOptions) => setFormState(prevState => {
        const options = newOptions.map(option => option.value);
        return { ...prevState,
          [key]: { ...prevState[key],
            options: prevState[key].options.map(option => ({ ...option,
              isSelected: options.includes(option.value)
            }))
          }
        };
      }),
      setFormField: (key, field) => setFormState(prevState => ({ ...prevState,
        [key]: {
          type: field.type,
          isPristine: true,
          value: field.value || '',
          options: field.options || [],
          isRequired: field.isRequired || false,
          disabled: field.disabled && field.disabled() || false
        }
      }))
    },
    state: {
      formState
    }
  };
};

exports.formStore = formStore;
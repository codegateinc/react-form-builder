import { useState } from 'react';
export const configStore = () => {
  const [configStore, setConfig] = useState({});
  const [configOnUpdate, setConfigOnUpdate] = useState({});
  return {
    actions: {
      setConfig: (key, newConfig) => setConfig(prevState => ({ ...prevState,
        [key]: newConfig
      })),
      clearConfigStore: formKey => setConfig(prevState => ({ ...prevState,
        [formKey]: {}
      })),
      setOnUpdate: (key, onUpdate) => onUpdate && setConfigOnUpdate(prevState => ({ ...prevState,
        [key]: onUpdate
      }))
    },
    state: {
      configStore,
      configOnUpdate
    }
  };
};
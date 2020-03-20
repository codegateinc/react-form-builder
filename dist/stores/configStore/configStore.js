import { useState } from 'react';
export const configStore = () => {
  const [configStore, setConfig] = useState({});
  return {
    actions: {
      setConfig: (key, newConfig) => setConfig(prevState => ({ ...prevState,
        [key]: newConfig
      })),
      clearConfigStore: formKey => setConfig(prevState => ({ ...prevState,
        [formKey]: {}
      }))
    },
    state: {
      configStore
    }
  };
};
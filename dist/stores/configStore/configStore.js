import { useState } from 'react';
export const configStore = () => {
  const [configStore, setConfig] = useState();
  const [configSuccessFunction, setSuccessFunction] = useState({});
  const [configErrorFunction, setErrorFunction] = useState({});
  return {
    actions: {
      setConfig: (key, newConfig) => setConfig(prevState => ({ ...prevState,
        [key]: newConfig
      })),
      setSuccessFunction: (key, newOnSuccess) => newOnSuccess && setSuccessFunction(prevState => ({ ...prevState,
        [key]: newOnSuccess
      })),
      setErrorFunction: (key, newOnError) => newOnError && setErrorFunction(prevState => ({ ...prevState,
        [key]: newOnError
      }))
    },
    state: {
      configStore,
      configSuccessFunction,
      configErrorFunction
    }
  };
};
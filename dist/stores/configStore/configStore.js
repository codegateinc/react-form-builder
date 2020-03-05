import { useState } from 'react';
export const configStore = () => {
  const [config, setConfig] = useState();
  const [successFunction, setSuccessFunction] = useState();
  const [errorFunction, setErrorFunction] = useState();
  return {
    actions: {
      setConfig,
      setSuccessFunction,
      setErrorFunction
    },
    state: {
      config,
      successFunction,
      errorFunction
    }
  };
};
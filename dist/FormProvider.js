import React from 'react';
import { Provider } from 'outstated';
import { formBuilderStores } from './stores';
export const FormProvider = ({
  children
}) => React.createElement(Provider, {
  stores: formBuilderStores
}, children);
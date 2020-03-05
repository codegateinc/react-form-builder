import React, { Fragment } from 'react';
import { renderForm } from './utils';
export const Form = ({
  children,
  formConfig,
  onError,
  onSuccess
}) => React.createElement(Fragment, null, renderForm(children, formConfig, onSuccess, onError));
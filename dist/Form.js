import React, { Fragment } from 'react';
import { renderForm } from './utils';
export const Form = ({
  children,
  formConfig,
  onError,
  onSuccess,
  formName
}) => React.createElement(Fragment, null, renderForm(children, formConfig, formName, onSuccess, onError));
import React, { Fragment } from 'react';
import { renderForm } from './utils';
export const Form = ({
  children,
  formName
}) => React.createElement(Fragment, null, renderForm(children, formName));
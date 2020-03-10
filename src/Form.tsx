import React, { Fragment } from 'react'
import { renderForm } from './utils'
import { FormProps } from './types'

export const Form: React.FunctionComponent<FormProps> = ({
    children,
    formConfig,
    onError,
    onSuccess,
    formName
}) => (
    <Fragment>
        {renderForm(children, formConfig, formName, onSuccess, onError)}
    </Fragment>
)

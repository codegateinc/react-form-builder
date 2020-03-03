import React, { Fragment } from 'react'
import { renderForm } from './utils'
import { FormProps } from './types'

export const Form: React.FunctionComponent<FormProps> = ({
    children,
    formConfig,
    onError,
    onSuccess
}) => (
    <Fragment>
        {renderForm(children, formConfig, onSuccess, onError)}
    </Fragment>
)

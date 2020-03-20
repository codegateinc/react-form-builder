import React, { Fragment } from 'react'
import { renderForm } from './utils'
import { FormProps } from './types'

export const Form: React.FunctionComponent<FormProps> = ({
    children,
    formName
}) => (
    <Fragment>
        {renderForm(children, formName)}
    </Fragment>
)

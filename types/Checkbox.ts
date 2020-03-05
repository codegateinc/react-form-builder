import React from 'react'
import { VoidFunction } from './common'

export type CheckboxComponentProps = {
    value: boolean,
    disabled: boolean,
    isPristine: boolean,
    errorMessage?: string,
    onChange: VoidFunction
}

export type CheckBoxProps = {
    formFieldName: string,
    errorMessage?: string,
    component(props: CheckboxComponentProps): React.ReactNode
}

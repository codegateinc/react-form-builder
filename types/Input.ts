import React from 'react'
import { VoidFunction } from './common'

export type InputComponentProps = {
    value: string,
    disabled: boolean,
    isPristine: boolean,
    errorMessage?: string,
    onBlur: VoidFunction,
    onChangeText(text: string): void
}

export type InputProps = {
    formFieldName: string,
    component(props: InputComponentProps): React.ReactNode
}

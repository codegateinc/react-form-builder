import React from 'react'
import { FormOption } from './Form'

export type PickerOnChange = (options: Array<FormOption>) => void

export type PickerComponentProps = {
    disabled: boolean,
    isPristine: boolean,
    errorMessage?: string,
    onChange: PickerOnChange,
    options: Array<FormOption>
}

export type PickerProps = {
    formFieldName: string,
    component(props: PickerComponentProps): React.ReactNode
}

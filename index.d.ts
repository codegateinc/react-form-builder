import React, { ReactNode } from 'react'
import { CheckBoxProps, FormProps, InputProps, PickerProps } from './src/types'

export namespace Field {
    export const Input: React.FunctionComponent<InputProps> = () => ReactNode
    export const Checkbox: React.FunctionComponent<CheckBoxProps> = () => ReactNode
    export const Picker: React.FunctionComponent<PickerProps> = () => ReactNode
}
export const Form: React.FunctionComponent<FormProps> = () => ReactNode
export const FormProvider: React.FunctionComponent = () => ReactNode

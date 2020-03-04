import React from 'react'
import { CheckBoxProps, FormProps, InputProps, PickerProps } from './src/types'

export namespace Field {
    export const Input: React.FunctionComponent<InputProps> = () => {}
    export const Checkbox: React.FunctionComponent<CheckBoxProps> = () => {}
    export const Picker: React.FunctionComponent<PickerProps> = () => {}
}
export const Form: React.FunctionComponent<FormProps> = () => {}
export const FormProvider: React.FunctionComponent = () => {}

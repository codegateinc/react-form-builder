import React from 'react'
import { CheckBoxProps, FieldConfig, FormProps, InputProps, PickerProps, VoidFunction } from './types'
import * as FormTypes from './types'

export namespace Field {
    export const Input: React.FunctionComponent<InputProps> = () => {}
    export const Checkbox: React.FunctionComponent<CheckBoxProps> = () => {}
    export const Picker: React.FunctionComponent<PickerProps> = () => {}
}
export const Form: React.FunctionComponent<FormProps> = () => {}
export const FormProvider: React.FunctionComponent = () => {}
export const useForm = () => ({
    submitForm: VoidFunction,
    hasChanges: () => boolean,
    setField: (formFieldName: string, field: FieldConfig) => {},
    isFormValid: boolean
})
export {
    FormTypes
}

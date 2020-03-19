import React from 'react'
import {
    FormProps,
    InputProps,
    PickerProps,
    FieldConfig,
    VoidFunction,
    CheckBoxProps,
    FormInputState,
    FormPickerState,
    FormCheckBoxState,
    SubscribeOnChange
} from './types'
import * as FormTypes from './types'

export namespace Field {
    export const Input: React.FunctionComponent<InputProps> = () => {}
    export const CheckBox: React.FunctionComponent<CheckBoxProps> = () => {}
    export const Picker: React.FunctionComponent<PickerProps> = () => {}
}
export const Form: React.FunctionComponent<FormProps> = () => {}
export const FormProvider: React.FunctionComponent = () => {}
export const useForm = (formName: string) => ({
    submitForm: VoidFunction,
    hasChanges: () => boolean,
    setField: (formFieldName: string, field: FieldConfig) => {},
    isFormValid: boolean,
    getField: (formFieldName: string) => FormInputState | FormCheckBoxState | FormPickerState,
    restoreToInitial: VoidFunction,
    subscribe: (formFieldName: string) => ({
        onChange: <T>(onChange: SubscribeOnChange<T>) => {}
    })
})
export {
    FormTypes
}

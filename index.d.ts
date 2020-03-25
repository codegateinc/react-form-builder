import React from 'react'
import {
    FormProps,
    InputProps,
    PickerProps,
    FieldConfig,
    VoidFunction,
    UseFormProps,
    CheckBoxProps,
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
export const useForm = (config: UseFormProps) => ({
    submitForm: VoidFunction,
    hasChanges: () => boolean,
    setField: (formFieldName: string, field: Omit<FieldConfig, 'type'>) => {},
    isFormValid: boolean,
    getField: (formFieldName: string) => {},
    restoreToInitial: VoidFunction,
    subscribe: (formFieldName: string) => ({
        onChange: <T>(onChange: SubscribeOnChange<T>) => {}
    }),
    isFormReady: boolean
})
export {
    FormTypes
}

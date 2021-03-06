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
    hasChanges: Boolean(),
    setField: (formFieldName: string, field: Omit<FieldConfig, 'type'>) => Void,
    isFormValid: Boolean(),
    getField: (formFieldName: string) => any,
    restoreToInitial: VoidFunction,
    clearForm: VoidFunction,
    subscribe: (formFieldName: string) => ({
        onChange: <T>(onChange: SubscribeOnChange<T>) => {}
    }),
    setFieldError: (formFieldName: string, errorMessage: string) => Void,
    isFormReady: Boolean()
})
export {
    FormTypes
}

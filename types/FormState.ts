import { KeyValuePair } from './common'
import { FormFieldType, FormOption } from './Form'

export type FormInputState = {
    value: string,
    isRequired: boolean,
    isPristine: boolean,
    disabled: boolean,
    type: FormFieldType,
    errorMessage?: string
}

export type FormCheckBoxState = {
    value: boolean,
    isRequired: boolean,
    isPristine: boolean,
    disabled: boolean,
    type: FormFieldType,
    errorMessage?: string
}

export type FormPickerState = {
    isRequired: boolean,
    isPristine: boolean,
    disabled: boolean,
    type: FormFieldType,
    errorMessage?: string,
    options: Array<FormOption>
}

export type FieldState = FormInputState | FormCheckBoxState | FormPickerState
export type FormState = KeyValuePair<FieldState>

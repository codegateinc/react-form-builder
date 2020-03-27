import { KeyValuePair } from './common'

export enum FormFieldType {
    Input = 0,
    Picker = 1,
    CheckBox = 2
}

type ValidationValue = string | number | boolean | Array<FormOption>

export type FormValidationRule = {
    errorMessage: string,
    validationFunction(value: ValidationValue): boolean
}

export type FormOptionValue = number | string

export type FormOption = {
    value: FormOptionValue,
    label: string,
    isSelected?: boolean
}

export type FieldConfig = {
    value?: string | number | boolean,
    type: FormFieldType,
    isRequired?: boolean,
    validationRules?: Array<FormValidationRule>,
    options?: Array<FormOption>,
    disabled?: boolean,
    liveParser?(value: ValidationValue): ValidationValue
}

export type FormConfig = KeyValuePair<FieldConfig>
// tslint:disable-next-line:no-any
export type OnSuccess = (form: any) => void
export type OnError = (errors: Array<KeyValuePair>) => void
export type FormProps = {
    formName: string
}

export interface UseFormProps extends FormProps {
    formConfig: FormConfig,
    onSuccess?: OnSuccess,
    onError?: OnError,
    debounce?: number
}

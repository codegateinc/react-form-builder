import { useState } from 'react'
import { FieldConfig, FormOption, FormPickerState, FormState } from '../../types'

export type FormStoreState = {
    [key: string]: FormState
}

export const formStore = () => {
    const [ formState, setFormState ] = useState<FormStoreState>({})

    return {
        actions: {
            setFormState: (key: string, state: FormState) => setFormState(prevState => ({
                ...prevState,
                [key]: state
            })),
            setFormValue: (formKey: string, key: string, value: string | boolean) => setFormState(prevState => ({
                ...prevState,
                [formKey]: {
                    ...prevState[formKey],
                    [key]: {
                        ...prevState[formKey][key],
                        value
                    }
                }
            })),
            setFormError: (formKey: string, key: string, errorMessage?: string) => formState[formKey] && setFormState(prevState => ({
                ...prevState,
                [formKey]: {
                    ...prevState[formKey],
                    [key]: {
                        ...prevState[formKey][key],
                        errorMessage
                    }
                }
            })),
            setFormPristine: (formKey: string, key: string, isPristine: boolean) => setFormState(prevState => ({
                ...prevState,
                [formKey]: {
                    ...prevState[formKey],
                    [key]: {
                        ...prevState[formKey][key],
                        isPristine
                    }
                }
            })),
            setFormOptions: (formKey: string, key: string, newOptions: Array<FormOption>) => setFormState(prevState => {
                const options = newOptions
                    .map(option => option.value)

                return {
                    ...prevState,
                    [formKey]: {
                        ...prevState[formKey],
                        [key]: {
                            ...prevState[formKey][key],
                            options: (prevState[formKey][key] as FormPickerState).options
                                .map(option => ({
                                    ...option,
                                    isSelected: options.includes(option.value)
                                }))
                        }
                    }
                }
            }),
            setFormField: (formKey: string, key: string, field: FieldConfig) => setFormState(prevState => ({
                ...prevState,
                [formKey]: {
                    ...prevState[formKey],
                    [key]: {
                        type: field.type,
                        isPristine: true,
                        value: field.value || '',
                        options: field.options || [],
                        isRequired: field.isRequired || false,
                        disabled: field?.disabled || false
                    }
                }
            }))
        },
        state: {
            formState
        }
    }
}

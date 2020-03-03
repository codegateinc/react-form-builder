import { useState } from 'react'
import { FieldConfig, FormOption, FormPickerState, FormState } from '../../types'

export const formStore = () => {
    const [ formState, setFormState ] = useState<FormState>({})

    return {
        actions: {
            setFormState,
            setFormValue: (key: string, value: string | boolean) => setFormState(prevState => ({
                ...prevState,
                [key]: {
                    ...prevState[key],
                    value
                }
            })),
            setFormError: (key: string, errorMessage?: string) => setFormState(prevState => ({
                ...prevState,
                [key]: {
                    ...prevState[key],
                    errorMessage
                }
            })),
            setFormPristine: (key: string, isPristine: boolean) => setFormState(prevState => ({
                ...prevState,
                [key]: {
                    ...prevState[key],
                    isPristine
                }
            })),
            setFormOptions: (key: string, newOptions: Array<FormOption>) => setFormState(prevState => {
                const options = newOptions
                    .map(option => option.value)

                return {
                    ...prevState,
                    [key]: {
                        ...prevState[key],
                        options: (prevState[key] as FormPickerState).options
                            .map(option => ({
                                ...option,
                                isSelected: options.includes(option.value)
                            }))
                    }
                }
            }),
            setFormField: (key: string, field: FieldConfig) => setFormState(prevState => ({
                ...prevState,
                [key]: {
                    type: field.type,
                    isPristine: true,
                    value: field.value || '',
                    options: field.options || [],
                    isRequired: field.isRequired || false,
                    disabled: field.disabled && field.disabled() || false
                }
            }))
        },
        state: {
            formState
        }
    }
}

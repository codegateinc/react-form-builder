import { useEffect, useState } from 'react'
import { FieldConfig, FormFieldType, FormOption, FormPickerState, FormState, SubscribeOnChange } from '../../types'

export type FormStoreState = {
    [key: string]: FormState
}

type OnChange = {
    [key: string]: SubscribeOnChange
}

type FormStoreOnChange = {
    [key: string]: OnChange
}

export const formStore = () => {
    const [ formState, setFormState ] = useState<FormStoreState>({})
    const [ onChangeForm, setOnChangeForm ] = useState<FormStoreOnChange>({})

    return {
        actions: {
            setFormState: (key: string, state: FormState) => setFormState(prevState => ({
                ...prevState,
                [key]: state
            })),
            setFormValue: (formKey: string, key: string, value: string | boolean) => {
                if (!formState[formKey]) {
                    return
                }

                setFormState(prevState => ({
                    ...prevState,
                    [formKey]: {
                        ...prevState[formKey],
                        [key]: {
                            ...prevState[formKey][key],
                            value
                        }
                    }
                }))

                if (onChangeForm[formKey] && onChangeForm[formKey][key]) {
                    onChangeForm[formKey][key](value)
                }
            },
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
            setFormPristine: (formKey: string, key: string, isPristine: boolean) => formState[formKey] && setFormState(prevState => ({
                ...prevState,
                [formKey]: {
                    ...prevState[formKey],
                    [key]: {
                        ...prevState[formKey][key],
                        isPristine
                    }
                }
            })),
            setFormOptions: (formKey: string, key: string, newOptions: Array<FormOption>) => formState[formKey] && setFormState(prevState => {
                const options = newOptions
                    .map(option => option.value)
                const changedOptions = (prevState[formKey][key] as FormPickerState).options
                    .map(option => ({
                        ...option,
                        isSelected: options.includes(option.value)
                    }))

                if (onChangeForm[formKey] && onChangeForm[formKey][key]) {
                    onChangeForm[formKey][key](changedOptions)
                }

                return {
                    ...prevState,
                    [formKey]: {
                        ...prevState[formKey],
                        [key]: {
                            ...prevState[formKey][key],
                            options: changedOptions
                        }
                    }
                }
            }),
            setFormField: (formKey: string, key: string, field: Omit<FieldConfig, 'type'>) => formState[formKey] && setFormState(prevState => ({
                ...prevState,
                [formKey]: {
                    ...prevState[formKey],
                    [key]: {
                        type: formState[formKey][key].type,
                        ...formState[formKey][key],
                        ...field,
                        options: field.options || (prevState[formKey][key].type === FormFieldType.Picker
                            ? (prevState[formKey][key] as FormPickerState).options
                            : []
                        )
                    }
                }
            })),
            getFormField: (formKey: string, key: string) => {
                if (formState[formKey] && formState[formKey][key]) {
                    return formState[formKey][key]
                }

                return {}
            },
            onFormFieldChange: (formKey: string, formFieldName: string, onChange: SubscribeOnChange) => {
                useEffect(() => {
                    setOnChangeForm(prevState => ({
                        ...prevState,
                        [formKey]: {
                            ...prevState[formKey],
                            [formFieldName]: onChange
                        }
                    }))
                }, [formState])
            },
            clearFormStore: (formKey: string) => {
                setFormState(prevState => ({
                    ...prevState,
                    [formKey]: {}
                }))
                setOnChangeForm(prevState => ({
                    ...prevState,
                    [formKey]: {}
                }))
            }
        },
        state: {
            formState
        }
    }
}

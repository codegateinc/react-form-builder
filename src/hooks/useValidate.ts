import { useStore } from 'outstated'
import { G } from '@codegateinc/g-utils'
import { configStore, formStore } from '../stores'
import { FieldState, FormCheckBoxState, FormFieldType, FormInputState, FormOption, FormPickerState } from '../types'

export const useValidate = () => {
    const form = useStore(formStore)
    const config = useStore(configStore)

    return {
        validateField: (formName: string, key: string, value: string) => {
            const field = config.state.configStore &&
                config.state.configStore[formName] &&
                config.state.configStore[formName][key]

            if (field?.validationRules) {
                const validated = field.validationRules
                    .map(rule => rule.validationFunction(value, form.state.formState[formName])
                        ? rule.errorMessage
                        : undefined
                    )
                const [ errorMessage ] = validated
                    .filter(value => value)

                form.actions.setFormError(formName, key, errorMessage)
            }
        },
        validateCheckBox: (formName: string, key: string, value: boolean) => {
            const field = config.state.configStore &&
                config.state.configStore[formName] &&
                config.state.configStore[formName][key]

            if (field?.validationRules) {
                const [ rule ] = field.validationRules
                const errorMessage = rule.validationFunction(value, form.state.formState[formName])
                    ? rule.errorMessage
                    : undefined

                form.actions.setFormError(formName, key, errorMessage)
            }
        },
        validatePicker: (formName: string, key: string, options: Array<FormOption>) => {
            const field = config.state.configStore &&
                config.state.configStore[formName] &&
                config.state.configStore[formName][key]
            const validated = field?.validationRules && field.validationRules
                .map(rule => rule.validationFunction(options, form.state.formState[formName])
                    ? rule.errorMessage
                    : undefined
                )
            const [ errorMessage ] = validated || [undefined]
                .filter(value => value)
            const isAnyOptionSelected = field?.options && field.options
                .some(option => option.isSelected)

            if (field?.isRequired && isAnyOptionSelected) {
                return form.actions.setFormError(formName, key, undefined)
            }

            form.actions.setFormError(formName, key, errorMessage)
        },
        validateForm: (formName: string, shouldUpdateStore: boolean = true) => form.state.formState[formName] ? G.toPairs<FieldState>(form.state.formState[formName])
            .map(([key, formState]) => {
                const configField = config.state.configStore && config.state.configStore[formName][key]

                if (configField?.validationRules && formState.type === FormFieldType.Input) {
                    const value = (formState as FormInputState).value

                    if (!formState.isRequired && value === '') {
                        return undefined
                    }

                    const validated = configField.validationRules
                        .map(rule => rule.validationFunction(value, form.state.formState[formName])
                            ? rule.errorMessage
                            : undefined
                        )
                    const [ errorMessage ] = validated
                        .filter(value => value)

                    if (shouldUpdateStore) {
                        form.actions.setFormError(formName, key, errorMessage)
                    }

                    return errorMessage
                }

                if (configField?.validationRules && formState.type === FormFieldType.CheckBox) {
                    const value = (formState as FormCheckBoxState).value

                    if (!formState.isRequired) {
                        return undefined
                    }

                    const [ rule ] = configField.validationRules
                    const errorMessage = rule.validationFunction(value, form.state.formState[formName])
                        ? rule.errorMessage
                        : undefined

                    if (shouldUpdateStore) {
                        form.actions.setFormError(formName, key, errorMessage)
                    }

                    return errorMessage
                }

                if (configField?.validationRules && formState.type === FormFieldType.Picker) {
                    const options = (formState as FormPickerState).options

                    if (!formState.isRequired) {
                        return undefined
                    }

                    const validated = configField.validationRules
                        .map(rule => rule.validationFunction(options, form.state.formState[formName])
                            ? rule.errorMessage
                            : undefined
                        )
                    const [ errorMessage ] = validated
                        .filter(value => value)

                    if (shouldUpdateStore) {
                        form.actions.setFormError(formName, key, errorMessage)
                    }

                    return errorMessage
                }
            }) : []
    }
}

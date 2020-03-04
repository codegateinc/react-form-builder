import { useStore } from 'outstated'
import { G } from '@codegateinc/g-utils'
import { configStore, formStore } from '../stores'
import { FieldState, FormCheckBoxState, FormFieldType, FormInputState, FormOption, FormPickerState } from '../types'

export const useValidate = () => {
    const form = useStore(formStore)
    const config = useStore(configStore)

    return {
        validateField: (key: string, value: string) => {
            const field = config.state.config && config.state.config[key]

            if (field?.validationRules) {
                const validated = field.validationRules
                    .map(rule => rule.validationFunction(value)
                        ? rule.errorMessage
                        : undefined
                    )
                const [ errorMessage ] = validated
                    .filter(value => value)

                form.actions.setFormError(key, errorMessage)
            }
        },
        validateCheckBox: (key: string, value: boolean) => {
            const field = config.state.config && config.state.config[key]

            if (field?.validationRules) {
                const [ rule ] = field.validationRules
                const errorMessage = rule.validationFunction(value)
                    ? rule.errorMessage
                    : undefined

                form.actions.setFormError(key, errorMessage)
            }
        },
        validatePicker: (key: string, options: Array<FormOption>) => {
            const field = config.state.config && config.state.config[key]
            const validated = field?.validationRules && field.validationRules
                .map(rule => rule.validationFunction(options)
                    ? rule.errorMessage
                    : undefined
                )
            const [ errorMessage ] = validated || [undefined]
                .filter(value => value)
            const isAnyOptionSelected = field?.options && field.options
                .some(option => option.isSelected)

            if (field?.isRequired && isAnyOptionSelected) {
                return form.actions.setFormError(key, errorMessage)
            }

            form.actions.setFormError(key, errorMessage)
        },
        validateForm: (shouldUpdateStore: boolean = true) => G.toPairs<FieldState>(form.state.formState)
            .map(([key, formState]) => {
                const configField = config.state.config && config.state.config[key]

                if (configField?.validationRules && formState.type === FormFieldType.Input) {
                    const value = (formState as FormInputState).value
                    const validated = configField.validationRules
                        .map(rule => rule.validationFunction(value)
                            ? rule.errorMessage
                            : undefined
                        )
                    const [ errorMessage ] = validated
                        .filter(value => value)

                    if (shouldUpdateStore) {
                        form.actions.setFormError(key, errorMessage)
                    }

                    return errorMessage
                }

                if (configField?.validationRules && formState.type === FormFieldType.CheckBox) {
                    const value = (formState as FormCheckBoxState).value
                    const [ rule ] = configField.validationRules
                    const errorMessage = rule.validationFunction(value)
                        ? rule.errorMessage
                        : undefined

                    if (shouldUpdateStore) {
                        form.actions.setFormError(key, errorMessage)
                    }

                    return errorMessage
                }

                if (configField?.validationRules && formState.type === FormFieldType.Picker) {
                    const options = (formState as FormPickerState).options
                    const validated = configField.validationRules
                        .map(rule => rule.validationFunction(options)
                            ? rule.errorMessage
                            : undefined
                        )
                    const [ errorMessage ] = validated
                        .filter(value => value)

                    if (shouldUpdateStore) {
                        form.actions.setFormError(key, errorMessage)
                    }

                    return errorMessage
                }
            })
    }
}

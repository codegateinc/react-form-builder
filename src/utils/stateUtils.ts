import { G } from '@codegateinc/g-utils'
import equals from 'deep-equal'
import {
    FormState,
    FieldConfig,
    FieldState,
    FormConfig,
    FormFieldType,
    FormInputState,
    FormPickerState,
    FormCheckBoxState,
    FormValidationRule
} from '../types'

export const prepareFormInitialState = (formConfig: FormConfig, prevState?: FormState) => {
    const configToPairs = G.toPairs<FieldConfig>(formConfig)
        .map(([ fieldName, config ]) => {
            if (config?.isRequired && !config?.validationRules) {
                throw new Error('validationRules are required if field isRequired  ')
            }

            if (config.type === FormFieldType.Input || config.type === FormFieldType.CheckBox) {
                const prevField = prevState && prevState[fieldName] as FormInputState | FormCheckBoxState

                return [fieldName, {
                    value: prevField?.value || config?.value || '',
                    isRequired: config?.isRequired || false,
                    isPristine: true,
                    disabled: config.disabled && config.disabled() || false,
                    type: config.type,
                    errorMessage: undefined
                }]
            }

            if (config.type === FormFieldType.Picker) {
                const prevField = prevState && prevState[fieldName] as FormPickerState
                const areOptionsSame = config.options && config.options
                    .every((option, index) => {
                        const labelsAreTheSame = option.label === prevField?.options[index].label
                        const valuesAreTheSame = option.value === prevField?.options[index].value

                        return labelsAreTheSame && valuesAreTheSame
                    })

                return [fieldName, {
                    isRequired: config?.isRequired || false,
                    isPristine: true,
                    disabled: config.disabled && config.disabled() || false,
                    type: config.type,
                    errorMessage: undefined,
                    options: areOptionsSame
                        ? prevField?.options
                        : config.options
                }]
            }
        }) as Array<[string, FieldState]>

    return G.fromPairs(configToPairs)
}

export const handleFormConfigChange = (prevConfig: FormConfig, formConfig: FormConfig) => {
    let hasChanges = false

    const configToPairs = G.toPairs<FieldConfig>(prevConfig)
        .map(([ fieldName, config ]) => {
            if (config?.isRequired && !config?.validationRules) {
                throw new Error('validationRules are required if field isRequired')
            }

            const checkedField = G.fromPairs(G.toPairs(config)
                .map(([key, value]) => {
                    const field = formConfig[fieldName]

                    if (key === 'validationRules') {
                        const validationRules = G.toPairs<FormValidationRule>(value)
                            .map(([ , rule ], index) => {
                                if (field.validationRules && rule.errorMessage !== field.validationRules[index].errorMessage) {
                                    hasChanges = true

                                    return field.validationRules[index]
                                }

                                return rule
                            })

                        return [key, validationRules]
                    }

                    if (equals(value, field[key])) {
                        return [key, value]
                    }

                    hasChanges = true

                    return [key, field[key]]
                }))

            return [fieldName, checkedField]
        }) as Array<[string, FieldState]>

    return {
        hasChanges,
        newConfig: G.fromPairs(configToPairs)
    }
}

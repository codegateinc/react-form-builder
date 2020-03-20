import { G } from '@codegateinc/g-utils'
import {
    FieldConfig,
    FieldState,
    FormConfig,
    FormFieldType
} from '../types'

export const prepareFormInitialState = (formConfig: FormConfig) => {
    const configToPairs = G.toPairs<FieldConfig>(formConfig)
        .map(([ fieldName, config ]) => {
            if (config?.isRequired && !config?.validationRules) {
                throw new Error('validationRules are required if field isRequired  ')
            }

            if (config.type === FormFieldType.Input || config.type === FormFieldType.CheckBox) {
                return [fieldName, {
                    value: config.value || '',
                    isRequired: config?.isRequired || false,
                    isPristine: true,
                    disabled: config?.disabled || false,
                    type: config.type,
                    errorMessage: undefined
                }]
            }

            if (config.type === FormFieldType.Picker) {
                return [fieldName, {
                    isRequired: config?.isRequired || false,
                    isPristine: true,
                    disabled: config?.disabled || false,
                    type: config.type,
                    errorMessage: undefined,
                    options: config.options
                }]
            }
        }) as Array<[string, FieldState]>

    return G.fromPairs(configToPairs)
}

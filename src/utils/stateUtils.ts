import { G } from '@codegateinc/g-utils'
import {
    FieldConfig,
    FieldState, FormCheckBoxState,
    FormConfig,
    FormFieldType, FormInputState, FormPickerState, FormState
} from '../types'
import { FormStoreState } from '../stores/formStore'

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

export const parseForm = (formName: string, state: FormStoreState) => state[formName] && G.toPairs<FieldState>(state[formName])
    .reduce((acc, [key, object]) => {
        if (object.type === FormFieldType.Input || object.type === FormFieldType.CheckBox) {
            const value = (object as FormInputState | FormCheckBoxState).value

            return {
                ...acc,
                [key]: value
            }
        }

        if (object.type === FormFieldType.Picker) {
            const options = (object as FormPickerState).options
                .filter(option => option.isSelected)
                .map(option => option.value)

            return {
                ...acc,
                [key]: options
            }
        }

        return acc
    }, {})

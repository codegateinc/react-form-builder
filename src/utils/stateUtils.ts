import { G } from '@codegateinc/g-utils'
import {
    FieldConfig,
    FieldState,
    FormCheckBoxState,
    FormConfig,
    FormFieldType,
    FormInputState,
    FormPickerState,
    FormState
} from 'types'

export const prepareFormInitialState = (formConfig: FormConfig, clearForm: boolean = false) => {
    const configToPairs = G.toPairs<FieldConfig>(formConfig)
        .map(([ fieldName, config ]) => {
            if (config?.isRequired && !config?.validationRules) {
                throw new Error('validationRules are required if field isRequired  ')
            }

            if (config.type === FormFieldType.Input) {
                return [fieldName, {
                    value: clearForm
                        ? ''
                        : config.value || '',
                    isRequired: config?.isRequired || false,
                    isPristine: true,
                    disabled: config?.disabled || false,
                    type: config.type,
                    errorMessage: undefined
                }]
            }

            if (config.type === FormFieldType.CheckBox) {
                return [fieldName, {
                    value: clearForm
                        ? false
                        : config.value || false,
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
                    options: clearForm
                        ? config.options?.map(option => ({
                            ...option,
                            isSelected: false
                        })) || []
                        : config.options || []
                }]
            }
        }) as Array<[string, FieldState]>

    return G.fromPairs(configToPairs)
}

export const parseForm = (state: FormState) => state && G.toPairs<FieldState>(state)
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

import { useStore } from 'outstated'
import { G } from '@codegateinc/g-utils'
import { useValidate } from './useValidate'
import { configStore, formStore } from '../stores'
import { FormCheckBoxState, FormInputState, FormOption, FormState } from '../types'

export const useChange = () => {
    const { state, actions } = useStore(formStore)
    const form = useStore(configStore)
    const { validateField, validateCheckBox, validatePicker } = useValidate()

    return {
        onInputChange: (formName: string, key: string, value: string, callback?: (state: FormState) => void) => {
            const field = state.formState[formName][key] as FormInputState
            const configField = form.state.configStore &&
                form.state.configStore[formName] &&
                form.state.configStore[formName][key]

            const parsedValue = configField?.liveParser
                ? configField.liveParser(value)
                : value

            if (typeof parsedValue !== 'string') {
                throw new Error('liveParser must return string on input')
            }

            const shouldValidateField = field.errorMessage || !field.isPristine || configField.forceLiveValidate

            if (shouldValidateField) {
                validateField(formName, key, parsedValue)
            }

            actions.setFormValue(formName, key, parsedValue, callback)
        },
        onCheckboxChange: (formName: string, key: string, callback?: (state: FormState) => void) => {
            const field = state.formState[formName][key] as FormCheckBoxState
            const configField = form.state.configStore &&
                form.state.configStore[formName] &&
                form.state.configStore[formName][key]

            const parsedValue = configField?.liveParser
                ? configField.liveParser(!field.value)
                : !field.value

            if (typeof parsedValue !== 'boolean') {
                throw new Error('liveParser must return boolean on checkbox')
            }

            if ((field.isRequired && !field.isPristine) || field.errorMessage || configField.validationRules) {
                validateCheckBox(formName, key, parsedValue)
            }

            actions.setFormValue(formName, key, parsedValue, callback)
        },
        onPickerChange: (formName: string, key: string, options: Array<FormOption>, callback?: (state: FormState) => void) => {
            const configField = form.state.configStore &&
                form.state.configStore[formName] &&
                form.state.configStore[formName][key]

            const parsedValue = configField?.liveParser
                ? configField.liveParser(options)
                : options

            if (!G.is(Array, parsedValue)) {
                throw new Error('liveParser must return array on picker')
            }

            validatePicker(formName, key, options)
            actions.setFormOptions(formName, key, options, callback)
        }
    }
}

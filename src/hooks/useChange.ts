import { useStore } from 'outstated'
import { useValidate } from './useValidate'
import { formStore } from '../stores'
import { FormCheckBoxState, FormInputState, FormOption } from '../types'

export const useChange = () => {
    const { state, actions } = useStore(formStore)
    const { validateField, validateCheckBox, validatePicker } = useValidate()

    return {
        onInputChange: (key: string, value: string) => {
            const field = state.formState[key] as FormInputState

            if (field.errorMessage || !field.isPristine) {
                validateField(key, value)
            }

            actions.setFormValue(key, value)
        },
        onCheckboxChange: (key: string) => {
            const field = state.formState[key] as FormCheckBoxState

            if (field.isRequired && !field.isPristine || field.errorMessage) {
                validateCheckBox(key, !field.value)
            }

            actions.setFormValue(key, !field.value)
            actions.setFormPristine(key, false)
        },
        onPickerChange: (key: string, options: Array<FormOption>) => {
            validatePicker(key, options)
            actions.setFormOptions(key, options)
        }
    }
}

import { useStore } from 'outstated'
import { useValidate } from './useValidate'
import { formStore } from '../stores'
import { FormCheckBoxState, FormInputState, FormOption } from '../types'

export const useChange = () => {
    const { state, actions } = useStore(formStore)
    const { validateField, validateCheckBox, validatePicker } = useValidate()

    return {
        onInputChange: (formName: string, key: string, value: string) => {
            const field = state.formState[formName][key] as FormInputState

            if (field.errorMessage || !field.isPristine) {
                validateField(formName, key, value)
            }

            actions.setFormValue(formName, key, value)
        },
        onCheckboxChange: (formName: string, key: string) => {
            const field = state.formState[formName][key] as FormCheckBoxState

            if (field.isRequired && !field.isPristine || field.errorMessage) {
                validateCheckBox(formName, key, !field.value)
            }

            actions.setFormValue(formName, key, !field.value)
            actions.setFormPristine(formName, key, false)
        },
        onPickerChange: (formName: string, key: string, options: Array<FormOption>) => {
            validatePicker(formName, key, options)
            actions.setFormOptions(formName, key, options)
        }
    }
}

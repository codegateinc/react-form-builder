import { useStore } from 'outstated'
import { useValidate } from './useValidate'
import { configStore, formStore } from '../stores'

export const useBlur = () => {
    const form = useStore(formStore)
    const config = useStore(configStore)
    const { validateField } = useValidate()

    return {
        onInputBlur: (formName: string, key: string, value: string) => {
            const field = form.state.formState[formName][key]
            const configField = config.state.configStore && config.state.configStore[formName][key]

            if (field.isRequired || value !== configField?.value) {
                form.actions.setFormPristine(formName, key, false)
            }

            validateField(formName, key, value)
        }
    }
}

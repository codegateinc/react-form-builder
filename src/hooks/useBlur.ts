import { useStore } from 'outstated'
import { useValidate } from './useValidate'
import { configStore, formStore } from '../stores'

export const useBlur = () => {
    const form = useStore(formStore)
    const config = useStore(configStore)
    const { validateField } = useValidate()

    return {
        onInputBlur: (key: string, value: string) => {
            const field = form.state.formState[key]
            const configField = config.state.config && config.state.config[key]

            if (field.isRequired || value !== configField?.value) {
                form.actions.setFormPristine(key, false)
            }

            validateField(key, value)
        }
    }
}

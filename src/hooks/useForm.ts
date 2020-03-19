import { useStore } from 'outstated'
import { G } from '@codegateinc/g-utils'
import { useValidate } from './useValidate'
import { prepareFormInitialState } from '../utils'
import { configStore, formStore } from '../stores'
import { FieldConfig, FieldState, FormCheckBoxState, FormFieldType, FormInputState, FormPickerState, SubscribeOnChange } from '../types'

export const useForm = <T>(formName: string) => {
    const { state, actions } = useStore(formStore)
    const config = useStore(configStore)
    const { validateForm } = useValidate()

    return {
        submitForm: () => {
            const validated = validateForm(formName)

            const hasAnyError = validated
                .some(value => value)

            if (hasAnyError) {
                return G.ifDefined(config.state.configErrorFunction[formName], G.call)
            }

            const parsedForm = state.formState[formName] && G.toPairs<FieldState>(state.formState[formName])
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

            return G.ifDefined(config.state.configSuccessFunction[formName], fn => fn(parsedForm))
        },
        hasChanges: state.formState[formName] && G.toPairs<FieldState>(state.formState[formName])
            .some(([key, object]) => !object.isPristine),
        setField: (formFieldName: string, field: Omit<FieldConfig, 'type'>) => actions.setFormField(formName, formFieldName, field),
        isFormValid: !validateForm(formName, false)
            .some(error => error),
        getField: (formFieldName: string) => actions.getFormField(formName, formFieldName),
        subscribe: (formFieldName: string) => ({
            onChange: <T>(onChange: SubscribeOnChange<T>) => actions.onFormFieldChange(formName, formFieldName, onChange)
        }),
        restoreToInitial: () => config.state.configStore && actions.setFormState(formName, prepareFormInitialState(config.state.configStore[formName]))
    }
}

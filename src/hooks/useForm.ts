import { useEffect } from 'react'
import { useStore } from 'outstated'
import { G } from '@codegateinc/g-utils'
import { parseForm, prepareFormInitialState } from 'utils'
import { configStore, formStore } from 'stores'
import {
    FieldState,
    FieldConfig,
    UseFormProps,
    SubscribeOnChange
} from 'types'
import { useValidate } from './useValidate'

export const useForm = <T>({
    formName,
    formConfig,
    onError,
    onSuccess,
    onUpdate
}: UseFormProps) => {
    const { state, actions } = useStore(formStore)
    const config = useStore(configStore)
    const { validateForm } = useValidate()

    useEffect(() => {
        const formState = prepareFormInitialState(formConfig)

        config.actions.setConfig(formName, formConfig)
        config.actions.setOnUpdate(formName, onUpdate)
        actions.setFormState(formName, formState)

        return () => {
            config.actions.clearConfigStore(formName)
            actions.clearFormStore(formName)
        }
    }, [])

    return {
        submitForm: () => {
            const validated = validateForm(formName)

            const hasAnyError = validated
                .some(value => value)

            if (hasAnyError) {
                return G.ifDefined(onError, fn => fn(validated))
            }

            const parsedForm = parseForm(state.formState[formName])

            return G.ifDefined(onSuccess, fn => fn(parsedForm))
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
        restoreToInitial: () => {
            if (config.state.configStore) {
                const newState = prepareFormInitialState(config.state.configStore[formName])

                actions.setFormState(formName, newState)

                G.ifDefined(onUpdate, fn => fn(parseForm(newState)))
            }
        },
        clearForm: () => {
            if (config.state.configStore) {
                const newState = prepareFormInitialState(config.state.configStore[formName], true)

                actions.setFormState(formName, newState)

                G.ifDefined(onUpdate, fn => fn(parseForm(newState)))
            }
        },
        isFormReady: G.hasKeys(state.formState[formName])
    }
}

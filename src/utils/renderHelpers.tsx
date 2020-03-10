import React, { useEffect } from 'react'
import { useStore } from 'outstated'
import { prepareFormInitialState, handleFormConfigChange } from './stateUtils'
import { useEvents } from '../hooks'
import { configStore, formStore } from '../stores'
import { CheckBox, Input, Picker } from '../components'
import {
    OnError,
    OnSuccess,
    FormConfig,
    FormOption,
    InputProps,
    PickerProps,
    CheckBoxProps,
    FormInputState,
    FormPickerState,
    FormCheckBoxState
} from '../types'

export const renderForm = (
    children: React.ReactNode,
    formConfig: FormConfig,
    formName: string,
    onSuccess?: OnSuccess,
    onError?: OnError
) => {
    if (!children) {
        throw new Error('children are mandatory')
    }

    if (!formConfig) {
        throw new Error('form config is required')
    }

    const { state, actions } = useStore(configStore)
    const form = useStore(formStore)

    useEffect(() => {
        const formState = prepareFormInitialState(formConfig)

        actions.setConfig(formName, formConfig)
        actions.setErrorFunction(formName, onError)
        actions.setSuccessFunction(formName, onSuccess)
        form.actions.setFormState(formName, formState)
    }, [])

    useEffect(() => {
        if (!state.configStore || !state.configStore[formName]) {
            return
        }

        const { newConfig, hasChanges } = handleFormConfigChange(state.configStore[formName], formConfig)

        if (hasChanges) {
            const newState = prepareFormInitialState(formConfig, form.state.formState[formName])

            actions.setConfig(formName, newConfig)
            form.actions.setFormState(formName, newState)
        }
    }, [formConfig, form])

    return React.Children.map(children, child => renderChild(child, formName))
}

const renderChild = (child: React.ReactNode, formName: string) => {
    if (typeof child === 'string' || typeof child === 'number' || typeof child === null) {
        return child
    }

    // tslint:disable-next-line:no-any
    const reactElementChild = child as React.ReactElement<any>

    if (reactElementChild.type === Input) {
        const { state } = useStore(formStore)
        const { input } = useEvents()
        const inputChild = child as React.ReactElement<InputProps>
        const key = inputChild.props.formFieldName
        const formState = state.formState[formName]
        const inputState = formState ? formState[key] as FormInputState : undefined

        return React.cloneElement<InputProps>(inputChild, {
            ...inputChild.props,
            component: () => inputChild.props.component({
                value: inputState?.value || '',
                onChangeText: text => input.onChange(formName, key, text),
                onBlur: () => input.onBlur(formName, key, inputState?.value || ''),
                errorMessage: inputState?.errorMessage,
                disabled: inputState?.disabled || false,
                isPristine: inputState?.isPristine || true
            })
        })
    }

    if (reactElementChild.type === CheckBox) {
        const { state } = useStore(formStore)
        const { checkBox } = useEvents()
        const checkBoxChild = child as React.ReactElement<CheckBoxProps>
        const key = checkBoxChild.props.formFieldName
        const formState = state.formState[formName]
        const checkBoxState = formState ? formState[key] as FormCheckBoxState : undefined

        return React.cloneElement<CheckBoxProps>(checkBoxChild, {
            ...checkBoxChild.props,
            component: () => checkBoxChild.props.component({
                value: checkBoxState?.value || false,
                onChange: () => checkBox.onChange(formName, key),
                errorMessage: checkBoxState?.errorMessage,
                disabled: checkBoxState?.disabled || false,
                isPristine: checkBoxState?.isPristine || true
            })
        })
    }

    if (reactElementChild.type === Picker) {
        const { state } = useStore(formStore)
        const { picker } = useEvents()
        const pickerChild = child as React.ReactElement<PickerProps>
        const key = pickerChild.props.formFieldName
        const formState = state.formState[formName]
        const pickerState = formState ? formState[key] as FormPickerState : undefined

        return React.cloneElement<PickerProps>(pickerChild, {
            ...pickerChild.props,
            component: () => pickerChild.props.component({
                onChange: (options: Array<FormOption>) => picker.onChange(formName, key, options),
                errorMessage: pickerState?.errorMessage,
                disabled: pickerState?.disabled || false,
                isPristine: pickerState?.isPristine || true,
                options: pickerState?.options || []
            })
        })
    }

    const reactElementChildren = reactElementChild.props.children

    if (reactElementChildren) {
        const newChildren = React.Children.map(reactElementChildren, child => renderChild(child, formName))

        return React.cloneElement(reactElementChild, reactElementChild.props, newChildren)
    }

    return reactElementChild
}

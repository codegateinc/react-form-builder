import React, { useEffect } from 'react'
import { G } from '@codegateinc/g-utils'
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

        actions.setConfig(formConfig)
        actions.setErrorFunction(() => onError)
        actions.setSuccessFunction(() => onSuccess)
        form.actions.setFormState(formState)
    }, [])

    useEffect(() => {
        if (!state.config) {
            return
        }

        const { newConfig, hasChanges } = handleFormConfigChange(state.config, formConfig)

        if (hasChanges) {
            const newState = prepareFormInitialState(formConfig, form.state.formState)

            actions.setConfig(newConfig)
            actions.setErrorFunction(() => onError)
            actions.setSuccessFunction(() => onSuccess)
            form.actions.setFormState(newState)
        }
    }, [formConfig, form])

    return React.Children.map(children, renderChild)
}

const renderChild = (child: React.ReactNode) => {
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
        const inputState = state.formState[key] as FormInputState

        return React.cloneElement<InputProps>(inputChild, {
            ...inputChild.props,
            component: () => inputChild.props.component({
                value: inputState?.value || '',
                onChangeText: text => input.onChange(key, text),
                onBlur: () => input.onBlur(key, inputState.value),
                errorMessage: inputState?.errorMessage,
                disabled: inputState?.disabled,
                isPristine: inputState?.isPristine
            })
        })
    }

    if (reactElementChild.type === CheckBox) {
        const { state } = useStore(formStore)
        const { checkBox } = useEvents()
        const checkBoxChild = child as React.ReactElement<CheckBoxProps>
        const key = checkBoxChild.props.formFieldName
        const checkBoxState = state.formState[key] as FormCheckBoxState

        return React.cloneElement<CheckBoxProps>(checkBoxChild, {
            ...checkBoxChild.props,
            component: () => checkBoxChild.props.component({
                value: checkBoxState?.value || false,
                onChange: () => checkBox.onChange(key),
                errorMessage: checkBoxState?.errorMessage,
                disabled: checkBoxState?.disabled,
                isPristine: checkBoxState?.isPristine
            })
        })
    }

    if (reactElementChild.type === Picker) {
        const { state } = useStore(formStore)
        const { picker } = useEvents()
        const pickerChild = child as React.ReactElement<PickerProps>
        const key = pickerChild.props.formFieldName
        const pickerState = state.formState[key] as FormPickerState

        return React.cloneElement<PickerProps>(pickerChild, {
            ...pickerChild.props,
            component: () => pickerChild.props.component({
                onChange: (options: Array<FormOption>) => picker.onChange(key, options),
                errorMessage: pickerState?.errorMessage,
                disabled: pickerState?.disabled,
                isPristine: pickerState?.isPristine,
                options: pickerState?.options || []
            })
        })
    }

    const reactElementChildren = reactElementChild.props.children

    if (reactElementChildren) {
        const newChildren = React.Children.map(reactElementChildren, renderChild)

        return React.cloneElement(reactElementChild, reactElementChild.props, newChildren)
    }

    return reactElementChild
}

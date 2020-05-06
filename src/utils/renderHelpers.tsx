import React from 'react'
import { G } from '@codegateinc/g-utils'
import { useStore } from 'outstated'
import { useEvents } from 'hooks/useEvents'
import { configStore, formStore } from 'stores'
import { CheckBox, Input, Picker } from 'components'
import {
    FormOption,
    InputProps,
    PickerProps,
    CheckBoxProps,
    FormInputState,
    FormPickerState,
    FormCheckBoxState
} from '../types'
import { parseForm } from './stateUtils'

export const renderForm = (
    children: React.ReactNode,
    formName: string
) => {
    if (!children) {
        throw new Error('children are mandatory')
    }

    return React.Children.map(children, child => renderChild(child, formName))
}

const renderChild = (child: React.ReactNode, formName: string) => {
    if (typeof child === 'string' || typeof child === 'number' || typeof child === null) {
        return child
    }

    const { state } = useStore(formStore)
    const { state: { configOnUpdate } } = useStore(configStore)

    // tslint:disable-next-line:no-any
    const reactElementChild = child as React.ReactElement<any>

    if (reactElementChild.type === Input) {
        const { input } = useEvents()
        const inputChild = child as React.ReactElement<InputProps>
        const key = inputChild.props.formFieldName
        const formState = state.formState[formName]
        const inputState = formState ? formState[key] as FormInputState : undefined

        return React.cloneElement<InputProps>(inputChild, {
            ...inputChild.props,
            component: () => inputChild.props.component({
                value: inputState?.value || '',
                onChangeText: text => input.onChange(formName, key, text, state => {
                    G.ifDefined(configOnUpdate[formName], fn => fn(parseForm(state)))
                }),
                onBlur: () => input.onBlur(formName, key, inputState?.value || ''),
                errorMessage: inputState?.errorMessage,
                disabled: inputState?.disabled || false,
                isPristine: inputState?.isPristine || true
            })
        })
    }

    if (reactElementChild.type === CheckBox) {
        const { checkBox } = useEvents()
        const checkBoxChild = child as React.ReactElement<CheckBoxProps>
        const key = checkBoxChild.props.formFieldName
        const formState = state.formState[formName]
        const checkBoxState = formState ? formState[key] as FormCheckBoxState : undefined

        return React.cloneElement<CheckBoxProps>(checkBoxChild, {
            ...checkBoxChild.props,
            component: () => checkBoxChild.props.component({
                value: checkBoxState?.value || false,
                onChange: () => checkBox.onChange(formName, key, state => {
                    G.ifDefined(configOnUpdate[formName], fn => fn(parseForm(state)))
                }),
                errorMessage: checkBoxState?.errorMessage,
                disabled: checkBoxState?.disabled || false,
                isPristine: checkBoxState?.isPristine || true
            })
        })
    }

    if (reactElementChild.type === Picker) {
        const { picker } = useEvents()
        const pickerChild = child as React.ReactElement<PickerProps>
        const key = pickerChild.props.formFieldName
        const formState = state.formState[formName]
        const pickerState = formState ? formState[key] as FormPickerState : undefined

        return React.cloneElement<PickerProps>(pickerChild, {
            ...pickerChild.props,
            component: () => pickerChild.props.component({
                onChange: (options: Array<FormOption>) => picker.onChange(formName, key, options, state => {
                    G.ifDefined(configOnUpdate[formName], fn => fn(parseForm(state)))
                }),
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

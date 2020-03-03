import { act, renderHook } from '@testing-library/react-hooks'
import { formStore } from './formStore'
import { FormFieldType, FormState } from '../../types'

const key = 'name'
const initialFormState: FormState = {
    [key]: {
        value: 'initial',
        isRequired: false,
        isPristine: false,
        type: FormFieldType.Input,
        disabled: false
    }
}

describe('[Stores]: FormStore', () => {
    it('should render itself', () => {
        const { result } = renderHook(formStore)

        expect(result.current.state.formState).toEqual({})
    })

    it('should setFormState', () => {
        const { result } = renderHook(formStore)

        act(() => result.current.actions.setFormState(initialFormState))

        expect(result.current.state.formState).toEqual(initialFormState)
    })

    it('should setFormValue', () => {
        const newValue = 'changed'
        const { result } = renderHook(formStore)
        const changedFormState: FormState = {
            [key]: {
                value: newValue,
                isRequired: false,
                isPristine: false,
                disabled: false,
                type: FormFieldType.Input,
            }
        }

        act(() => result.current.actions.setFormState(initialFormState))
        act(() => result.current.actions.setFormValue(key, newValue))

        expect(result.current.state.formState).toEqual(changedFormState)
    })

    it('should setFormError', () => {
        const errorMessage = 'error'
        const { result } = renderHook(formStore)
        const changedFormState: FormState = {
            [key]: {
                value: 'initial',
                isRequired: false,
                isPristine: false,
                disabled: false,
                type: FormFieldType.Input,
                errorMessage
            }
        }

        act(() => result.current.actions.setFormState(initialFormState))
        act(() => result.current.actions.setFormError(key, errorMessage))

        expect(result.current.state.formState).toEqual(changedFormState)
    })
})

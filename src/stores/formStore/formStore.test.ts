import { act, renderHook } from '@testing-library/react-hooks'
import { formStore, FormStoreState } from './formStore'
import { FormFieldType } from '../../types'

const key = 'name'
const formName = 'formName'
const formState = {
    [key]: {
        value: 'initial',
        isRequired: false,
        isPristine: false,
        type: FormFieldType.Input,
        disabled: false
    }
}
const initialFormState: FormStoreState = {
    [formName]: formState
}

describe('[Stores]: FormStore', () => {
    it('should render itself', () => {
        const { result } = renderHook(formStore)

        expect(result.current.state.formState).toEqual({})
    })

    it('should setFormState', () => {
        const { result } = renderHook(formStore)

        act(() => result.current.actions.setFormState(formName, formState))

        expect(result.current.state.formState).toEqual(initialFormState)
    })

    it('should setFormValue', () => {
        const newValue = 'changed'
        const { result } = renderHook(formStore)
        const changedFormState: FormStoreState = {
            ...initialFormState,
            [formName]: {
                ...initialFormState[formName],
                [key]: {
                    ...initialFormState[formName][key],
                    value: newValue
                }
            }
        }

        act(() => result.current.actions.setFormState(formName, formState))
        act(() => result.current.actions.setFormValue(formName, key, newValue))

        expect(result.current.state.formState).toEqual(changedFormState)
    })

    it('should setFormError', () => {
        const errorMessage = 'error'
        const { result } = renderHook(formStore)
        const changedFormState: FormStoreState = {
            ...initialFormState,
            [formName]: {
                ...initialFormState[formName],
                [key]: {
                    ...initialFormState[formName][key],
                    errorMessage
                }
            }
        }

        act(() => result.current.actions.setFormState(formName, formState))
        act(() => result.current.actions.setFormError(formName, key, errorMessage))

        expect(result.current.state.formState).toEqual(changedFormState)
    })
})

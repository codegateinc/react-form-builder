import { renderHook, act } from '@testing-library/react-hooks'
import { configStore } from './configStore'
import { FormConfig, FormFieldType } from '../../types'

describe('[Stores]: ConfigStore', () => {
    it('should render itself', () => {
        const { result } = renderHook(configStore)

        expect(result.current.state.config).toEqual(undefined)
    })

    it('should setConfig', () => {
        const { result } = renderHook(configStore)
        const expectedConfig: FormConfig = {
            name: {
                value: 'initial',
                type: FormFieldType.Input
            }
        }

        act(() => result.current.actions.setConfig(expectedConfig))

        expect(result.current.state.config).toEqual(expectedConfig)
    })
})

import { renderHook, act } from '@testing-library/react-hooks'
import { configStore, ConfigStoreState } from './configStore'
import { FormFieldType } from '../../types'

describe('[Stores]: ConfigStore', () => {
    it('should render itself', () => {
        const { result } = renderHook(configStore)

        expect(result.current.state.configStore).toEqual({})
    })

    it('should setConfig', () => {
        const { result } = renderHook(configStore)
        const name = 'name'
        const config = {
            config: {
                value: 'initial',
                type: FormFieldType.Input
            }
        }
        const expectedConfig: ConfigStoreState = {
            [name]: config
        }

        act(() => result.current.actions.setConfig(name, config))

        expect(result.current.state.configStore).toEqual(expectedConfig)
    })
})

import { useState } from 'react'
import { FormConfig, OnUpdate } from '../../types'

export type ConfigStoreState = {
    [key: string]: FormConfig
}

export type ConfigOnUpdate = {
    [key: string]: OnUpdate
}

export const configStore = () => {
    const [ configStore, setConfig ] = useState<ConfigStoreState>({})
    const [ configOnUpdate, setConfigOnUpdate ] = useState<ConfigOnUpdate>({})

    return {
        actions: {
            setConfig: (key: string, newConfig: FormConfig) => setConfig(prevState => ({
                ...prevState,
                [key]: newConfig
            })),
            clearConfigStore: (formKey: string) => setConfig(prevState => ({
                ...prevState,
                [formKey]: {}
            })),
            setOnUpdate: (key: string, onUpdate?: OnUpdate) => onUpdate && setConfigOnUpdate(prevState => ({
                ...prevState,
                [key]: onUpdate
            }))
        },
        state: {
            configStore,
            configOnUpdate
        }
    }
}

import { useState } from 'react'
import { FormConfig } from '../../types'

export type ConfigStoreState = {
    [key: string]: FormConfig
}

export const configStore = () => {
    const [ configStore, setConfig ] = useState<ConfigStoreState>({})

    return {
        actions: {
            setConfig: (key: string, newConfig: FormConfig) => setConfig(prevState => ({
                ...prevState,
                [key]: newConfig
            })),
            clearConfigStore: (formKey: string) => setConfig(prevState => ({
                ...prevState,
                [formKey]: {}
            }))
        },
        state: {
            configStore
        }
    }
}

import { useState } from 'react'
import { FormConfig, OnError, OnSuccess } from '../../types'

export type ConfigStoreState = {
    [key: string]: FormConfig
}

type ConfigStoreOnSuccess = {
    [key: string]: OnSuccess
}

type ConfigStoreOnError = {
    [key: string]: OnError
}

export const configStore = () => {
    const [ configStore, setConfig ] = useState<ConfigStoreState>()
    const [ configSuccessFunction, setSuccessFunction ] = useState<ConfigStoreOnSuccess>({})
    const [ configErrorFunction, setErrorFunction ] = useState<ConfigStoreOnError>({})

    return {
        actions: {
            setConfig: (key: string, newConfig: FormConfig) => setConfig(prevState => ({
                ...prevState,
                [key]: newConfig
            })),
            setSuccessFunction: (key: string, newOnSuccess?: OnSuccess) => newOnSuccess && setSuccessFunction(prevState => ({
                ...prevState,
                [key]: newOnSuccess
            })),
            setErrorFunction: (key: string, newOnError?: OnError) => newOnError && setErrorFunction(prevState => ({
                ...prevState,
                [key]: newOnError
            }))
        },
        state: {
            configStore,
            configSuccessFunction,
            configErrorFunction
        }
    }
}

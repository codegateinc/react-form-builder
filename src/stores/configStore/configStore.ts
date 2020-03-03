import { useState } from 'react'
import { FormConfig } from '../../types'

export const configStore = () => {
    const [ config, setConfig ] = useState<FormConfig>()
    const [ successFunction, setSuccessFunction ] = useState()
    const [ errorFunction, setErrorFunction ] = useState()

    return {
        actions: {
            setConfig,
            setSuccessFunction,
            setErrorFunction
        },
        state: {
            config,
            successFunction,
            errorFunction
        }
    }
}

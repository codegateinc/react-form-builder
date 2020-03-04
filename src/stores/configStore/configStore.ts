import { useState } from 'react'
import { VoidFunction } from 'lib/types'
import { FormConfig } from '../../types'

export const configStore = () => {
    const [ config, setConfig ] = useState<FormConfig>()
    const [ successFunction, setSuccessFunction ] = useState<VoidFunction>()
    const [ errorFunction, setErrorFunction ] = useState<VoidFunction>()

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

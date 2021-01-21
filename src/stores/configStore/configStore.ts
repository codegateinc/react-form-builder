import { useState } from 'react'
import { FormConfig, OnUpdate, FieldConfig, FormFieldType } from '../../types'

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
            })),
            setConfigFormField: (formKey: string, key: string, field: Omit<FieldConfig, 'type'>) => {
                if (configStore[formKey] && configStore[formKey][key]) {
                    setConfig(prevState => ({
                        ...prevState,
                        [formKey]: {
                            ...prevState[formKey],
                            [key]: {
                                ...configStore[formKey][key],
                                ...field,
                                type: configStore[formKey][key].type,
                                options: field.options || (configStore[formKey][key].type === FormFieldType.Picker
                                    ? configStore[formKey][key].options
                                    : []
                                )
                            }
                        }
                    }))
                }
            }
        },
        state: {
            configStore,
            configOnUpdate
        }
    }
}

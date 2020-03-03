import React from 'react'
import { Provider } from 'outstated'
import { formBuilderStores } from './stores'

export const FormProvider: React.FunctionComponent = ({ children }) => (
    <Provider stores={formBuilderStores}>
        {children}
    </Provider>
)

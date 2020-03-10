import { FormOption } from 'types'

export type VoidFunction = () => void
// tslint:disable-next-line:no-any
export type KeyValuePair<T = any> = {
    [key: string]: T
}
export type SubscribeOnChange = (value: string | boolean | Array<FormOption>) => void

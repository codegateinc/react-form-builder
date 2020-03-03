import { useBlur } from './useBlur'
import { useChange } from './useChange'

export const useEvents = () => {
    const { onInputBlur } = useBlur()
    const { onInputChange, onCheckboxChange, onPickerChange } = useChange()

    return {
        input: {
            onBlur: onInputBlur,
            onChange: onInputChange
        },
        checkBox: {
            onChange: onCheckboxChange
        },
        picker: {
            onChange: onPickerChange
        }
    }
}

# @codegateinc/react-form-builder

@codegateinc/react-form-builder is a javascript library that helps you create your own form in simply way

## Installation

`yarn add @codegateinc/react-form-builder` or `npm install @codegateinc/react-form-builder`

## Usage

### 1. First step is to wrap your whole app in FormProvider

```
    import { FormProvider } from 'react-form-builder'

    const App = () => (
        <FormProvider>
            {routes/components/children}
        </FormProvider>
    )
```

### 2. Second step is to implement your form

You can take `formConfig` from here and move it somewhere else, same as rendered components, 
you can just simply create helpers that will render input, checkbox or picker for you.

#### Important

Just remember that you need to render `Field.TYPES` directly to `Form`, so helpers must be 
functions that returns JSX

```
    import { Form } from '@codegateinc/react-form-builder'

    const form = (
        <Form
            formConfig={{
                inputName: {
                    type: FormTypes.FormFieldType.Input,
                    value: ''
                },
                checkboxName: {
                    type: FormTypes.FormFieldType.CheckBox,
                    value: false
                },
                pickerName: {
                    type: FormTypes.FormFieldType.Picker,
                    options: [
                        {
                            value: 0,
                            label: 'first'
                        },
                        {
                            value: 1,
                            label: 'second'
                        }
                    ]
                }
            }}
        >
            <Field.Input
                formFieldName="inputName"
                component={({ value, onChangeText }) => (
                    <input
                        value={value}
                        onChange={({ target }) => onChangeText(target.value)}
                    />
                )}
            />
            <Field.Checkbox
                formFieldName="checkboxName"
                component={({ value, onChange }) => (
                    <input
                        type="checkbox"
                        checked={value}
                        onClick={onChange}
                    />
                )}
            />
            <Field.Picker
                formFieldName="pickerName"
                component={({ options, onChange }) => (
                    <select
                        value={options.filter(option => option.isSelected)[0]?.value}
                        onChange={({ target }) => {
                            const selectedOption = options.filter(option => option.value === target.value)

                            onChange(selectedOption)
                        }}
                    >
                        {options.map(({ value, label }) => (
                            <option
                                value={value}
                                key={value}
                            >
                                {label}
                            </option>
                        ))}
                    </select>
                )}
            />
        </Form>
    )
```

## Props

#### Field

|component|                 props                                     | description
|---------|-----------------------------------------------------------|------------
|Input    |`formFieldName: string`                                    |field name the same as in `formConfig`
|         |`component(props: InputComponentProps): React.ReactNode`   |render function
|Checkbox |`formFieldName: string`                                    |field name the same as in `formConfig`
|         |`component(props: CheckboxComponentProps): React.ReactNode`|render function
|Picker   |`formFieldName: string`                                    |field name the same as in `formConfig`
|         |`component(props: PickerComponentProps): React.ReactNode`  |render function

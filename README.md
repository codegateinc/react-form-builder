# @codegateinc/react-form-builder

## Supports both React and React native

@codegateinc/react-form-builder is a javascript library that helps you create your own form in the simple way.
It can be used in React and React Native without any worry about compatibility.

## Installation

`yarn add @codegateinc/react-form-builder` or `npm install @codegateinc/react-form-builder`

## Usage

### 1. First step is to wrap your app in FormProvider

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
            formName="uniqueFormName"
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

#### Form

|props     |                 type                                      | description
|----------|-----------------------------------------------------------|------------
|formName  |`formName: string`                                         |unique formName
|formConfig|`formConfig: KeyValuePair<FormConfig>`                     |form config that includes initial values, options, validators, and types of fields
|onSuccess |`onSuccess?: form => void`                                 |optional function that provides parsed form after it has been submitted and is valid
|onError   |`onError?: Function`                                       |optional function that is invoked when form is not valid and has been submitted

##### FormConfig

###### FormConfig is an Object with FieldConfig assigned to each key

###### FieldConfig

|props          |                 type                                      | description
|---------------|-----------------------------------------------------------|------------
|value          |`value?: string / number / boolean`                        |value defines initial values of input and checkbox
|type           |`type: FormFieldType`                                      |type is required prop that defines type of field
|isRequired     |`isRequired?: boolean`                                     |prop that defines if field should be validated, if true, you must provide validationRules
|validationRules|`validationRules?: Array<FormValidationRule>`              |defines validation rules and error message to each rule
|options        |`optiions?: Array<FormOption>`                             |options defines initial values of picker field
|disabled       |`disabled?: boolean`                                       |defines if field is disabled or not
|liveParser     |`liveParse?: (value: ValidationValue) => ValidationValue`  |if defined, it is called on each field change, which the function is related to

#### Field

|component|                 props                                     | description
|---------|-----------------------------------------------------------|------------
|Input    |`formFieldName: string`                                    |field name the same as in `formConfig`
|         |`component(props: InputComponentProps): React.ReactNode`   |render function
|Checkbox |`formFieldName: string`                                    |field name the same as in `formConfig`
|         |`component(props: CheckboxComponentProps): React.ReactNode`|render function
|Picker   |`formFieldName: string`                                    |field name the same as in `formConfig`
|         |`component(props: PickerComponentProps): React.ReactNode`  |render function

#### FormTypes

|   name            |type               |              value
|-------------------|-------------------|----------------------------------
|FormFieldType      |enum               |`Input, Picker, CheckBox`
|FormValidationRule |type               |`{ errorMessage: string, validationFunction: (value: ValidationValue) => boolean}`
|ValidationValue    |type               |`string \| number \| boolean \| Array<FormOption>`
|FormOption         |type               |`{ value: FormOptionValue, label: string, isSelected?: boolean }`
|FormOptionValue    |type               |`number \| string`

## useForm hook

useForm hook provides submit function along with some useful functions that allow to for example get value of single field or subscribe to it

|     function         |       type                                                               |description
|----------------------|--------------------------------------------------------------------------|-------------
|submitForm            |`() => void`                                                              |call to this function validates every field that was defined with `validationRule`, calls `Form`'s `onError` if errors occurs or `onSuccess`
|hasChanges            |`boolean`                                                                 |value that informs about any change done to form
|setField              |`(formFieldName: string, config: Omit<FieldConfig, 'type'>) => void`      |sets new config for selected field
|isFormValid           |`boolean`                                                                 |value that tells if form is valid
|getField              |`(formFieldname: string) => FormStateConfig`                              |returns selected field
|restoreToInitial      |`() => void`                                                              |restores form config to initial values
|subscribe             |`(formFieldName: string) => { onChange: <T>((value: T) => void) => void }`|subscribes to field and returns value from form after it changes (this particular field)


## Form fields

### Input

#### types

```

type InputComponentProps = {
    value: string,
    disabled: boolean,
    isPristine: boolean,
    errorMessage?: string,
    onBlur: VoidFunction,
    onChangeText(text: string): void
}

type InputProps = {
    formFieldName: string,
    component(props: InputComponentProps): React.ReactNode
}

```

#### render example

```
<Field.Input
    formFieldName={formFieldName}
    component={({
        value,
        onChangeText,
        onBlur
    }) => {
        return (
            <input
                value={value}
                onChange={({ target }) => onChangeText(target.value)}
                onBlur={onBlur}
            />
        )
    }}
/>
```

### Checkbox

#### props

```
type CheckboxComponentProps = {
    value: boolean,
    disabled: boolean,
    isPristine: boolean,
    errorMessage?: string,
    onChange: VoidFunction
}

type CheckBoxProps = {
    formFieldName: string,
    component(props: CheckboxComponentProps): React.ReactNode
}
```

####render example

```
<Field.Checkbox
    formFieldName={formFieldName}
    component={({
        value,
        onChange
    }) => (
        <input
            type="checkbox"
            checked={value}
            onClick={onChange}
        />
    )}
/>
```

### Picker

#### props

```
type PickerOnChange = (options: Array<FormOption>) => void

type PickerComponentProps = {
    disabled: boolean,
    isPristine: boolean,
    errorMessage?: string,
    onChange: PickerOnChange,
    options: Array<FormOption>
}

type PickerProps = {
    formFieldName: string,
    component(props: PickerComponentProps): React.ReactNode
}
```

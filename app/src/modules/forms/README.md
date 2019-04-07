# Forms Module

This module exports components and mixins related to data forms, such as forms, inputs, textarea, etc.

# Components

## TextControl
This component handles an input functional and UI state.
### Props
- **error (boolean)**: If true, the input is set to error state with all its UI implications.
- **errormessages (string[])**: Array of error messages to be shown.
- **value (any)**: input's value.

### Events
- **input (any)**: Emits whenever the input's value changes.
- **blur (FocusEvent)**: Emits the input's onblur event.

## SingleValueValidator
This component handles an input's validation. The input must be an `AbstractControlComponent` and it should be inside the slot of the `SingleValueValidator` component.

### Props
- **validators (AbstractValidator[])**: Validators to use to validate the input.
- **errorsDictionary (ErrorMessagesDictionary)**: A dictionary with human-readable error messages.

### Usage

Template:
```html
  <SingleValueValidator :validators="validators" :errorsDictionary="{ required: 'Campo Requerido', default: 'Error en el campo' }" v-slot="{ error, errormessages, validatefn }">
    <TextControl
      :value="value"
      :error="error"
      :errormessages="errormessages"
      @input="(e) => onInput(e, validatefn)"
      @blur="(e) => onBlur(e, validatefn)"
    />
  </SingleValueValidator>
```

# Validators
## RequiredValidator
Validates if the input is absent (`null`, `''` or `undefined`) and throws a `RequiredValidationError` if it fails.

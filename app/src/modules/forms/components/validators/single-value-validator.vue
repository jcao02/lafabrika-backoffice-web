<template>
  <span>
    <slot :errorMessages="errorMessages" :error="error" :validatefn="doValidate"></slot>
  </span>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AbstractValidatorComponent } from './abstract-validator-component';
import { AbstractValidationError } from '../../classes/errors';

@Component
export default class SingleValueValidator extends AbstractValidatorComponent {

  /**
   * Returns true if the validation should be performed
   * By default, it will start validation if the control state is touched
   */
  shouldValidate(): boolean {
    return this.controlState!.touched;
  }
  /**
   * Validates the value provided
   * @param value to validate
   */
  doValidate(value: any): void {
    const errors = this.validators.reduce((acc, validator) => {
      const errorOrNull = validator.validate(value);
      if (errorOrNull) {
        acc.push(errorOrNull);
      }
      return acc;
    }, [] as AbstractValidationError[]);

    // Set visual state
    this.error = errors.length > 0;

    // Set messages
    this.setErrorMessages(errors);

    // Notify all the observers of validation performed
    this.notify();

  }

  /**
   * Sets the errorMessages array based on the error objects array
   */
  private setErrorMessages(errors: AbstractValidationError[]) {
    this.errorMessages = errors.map(
      e => {
        const stringOrFunction = e.name in this.errorsDictionary
          ? this.errorsDictionary[e.name]
          : this.errorsDictionary.default;

        if (typeof stringOrFunction === 'function') {
          const args = e.args || [];
          return stringOrFunction(...args);
        } else {
          return stringOrFunction;
        }
      }
    );
  }

}
</script>

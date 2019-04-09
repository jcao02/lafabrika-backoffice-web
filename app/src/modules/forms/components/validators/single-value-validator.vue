<template>
  <span>
    <slot :errorMessages="errorMessages" :error="error" :validatefn="validate"></slot>
  </span>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AbstractValidatorComponent } from './abstract-validator-component';
import { AbstractValidationError } from '../../classes/errors/validation-error';

@Component
export default class SingleValueValidator extends AbstractValidatorComponent {
  /**
   * Validates the innerValue of the TextControl
   */
  validate(value: any): void {
    const errors = this.validators.reduce((acc, validator) => {
      const errorOrNull = validator.validate(value);
      if (errorOrNull) {
        acc.push(errorOrNull);
      }
      return acc;
    }, [] as AbstractValidationError[]);

    this.error = errors.length > 0;
    this.errorMessages = errors.map(e => this.errorsDictionary[e.name] ? this.errorsDictionary[e.name] : this.errorsDictionary.default);

    // Notify all the observers of validation performed
    this.notify();
  }

}
</script>

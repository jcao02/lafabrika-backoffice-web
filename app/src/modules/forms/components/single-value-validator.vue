<template>
  <span>
    <!-- This component only accepts AbstractControlComponents -->
    <slot @input="this.validate" :error="this.error" :errormessages="this.errormessages"></slot>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AbstractValidatorComponent } from '../interfaces/abstract-validator-component';
import { AbstractValidationError } from '../interfaces/validation-error';

@Component
export default class SingleValueValidator extends AbstractValidatorComponent {
  error: boolean = false;
  errormessages: string[] = [];

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
  }
}
</script>

<template>
  <span>
    <!-- This component only accepts AbstractControlComponents -->
    <slot @input="this.validate" :error="this.error"></slot>
  </span>
</template>

<script lang="ts">
import { AbstractValidatorComponent } from '../interfaces/abstract-validator-component';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SingleValueValidator extends AbstractValidatorComponent {
  error: boolean = false;
  errorMessages: string[];

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
    }, []);

    this.error = errors.length > 0;
  }
}
</script>

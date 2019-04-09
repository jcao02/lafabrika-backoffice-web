<template>
  <span>
    <slot :errorMessages="errorMessages" :error="error" :validatefn="validate"></slot>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator';
import { AbstractValidatorComponent } from './abstract-validator-component';
import { AbstractValidationError } from '../../classes/errors/validation-error';
import { Observer } from '../../../shared/classes/observer';

@Component
export default class SingleValueValidator extends AbstractValidatorComponent {
  @Inject({ default: null }) readonly vObserver!: Observer;

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

  created() {
    super.created();
    this.subscribe(this.vObserver);
  }

  destroyed() {
    this.unsubscribe(this.vObserver);
  }
}
</script>

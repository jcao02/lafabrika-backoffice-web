<template>
  <form v-on="$listeners">
    <slot :valid="valid"></slot>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import { Observer } from 'lafabrika-patterns';
import { AbstractValidatorComponent } from '../validators/abstract-validator-component';

@Component
export default class FormWithValidation extends Vue implements Observer {
  @Provide() vObserver = this;

  validatorsMap: Record<number, AbstractValidatorComponent> = {};

  update(value: AbstractValidatorComponent): void {
    this.validatorsMap = { ...this.validatorsMap, [value.vid]: value };
  }

  validate(): boolean {
    const validators = Object.values(this.validatorsMap);
    validators.forEach(v => {
      v.forceValidation();
      v.validate();
    });

    return this.valid;
  }

  get valid() {
    return Object.values(this.validatorsMap).reduce((acc, value) => acc && !value.error, true);
  }
}

</script>


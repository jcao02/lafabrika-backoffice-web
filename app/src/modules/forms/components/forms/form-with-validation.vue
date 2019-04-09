<template>
  <form>
    <slot :valid="valid"></slot>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { Observer } from '../../../shared/classes/observer';
import { AbstractValidatorComponent } from "../validators/abstract-validator-component";

@Component
export default class FormWithValidation extends Vue implements Observer {
  @Provide() vObserver = this;

  validationMap: Record<number, boolean> = {};

  update(value: AbstractValidatorComponent): void {
    this.validationMap = { ...this.validationMap, [value.vid]: value.$data.error };
  }

  get valid() {
    return Object.values(this.validationMap).reduce((acc, value) => acc && !value, true);
  }
}

</script>


<template>
  <SingleValueValidator :validators="validatorObjects" :errorsDictionary="errorsDictionary" v-slot="{ error, errorMessages }">
    <TextControl
      :value="value"
      :error="error"
      :errorMessages="errorMessages"
      :label="label"
      :type="type"
      :placeholder="placeholder"
      v-on="$listeners"
    />
  </SingleValueValidator>
</template>

<script lang="ts">
import { Prop, Vue, Component, Emit } from 'vue-property-decorator';
import { AbstractValidator } from '../../classes/validators/abstract-validator';
import { ValidatorFactory } from '../../classes/factories/validator-factory';
import { defaultDictionary } from '../../classes/error-messages/default-error-messages';
import { ValidatorName } from '../../classes/validators/validator-names';

import SingleValueValidator from '../validators/single-value-validator.vue';
import TextControl from './text-control.vue';
import { Control } from '../../classes/controls/control';

@Component({
  components: {
    SingleValueValidator,
    TextControl
  }
})
export default class TextWithValidationControl extends Vue implements Control {
  @Prop() value: any;
  @Prop() validators!: string;
  @Prop() label!: string;
  @Prop() type!: string;
  @Prop() placeholder!: string;
  errorsDictionary = defaultDictionary;

  get validatorObjects(): AbstractValidator[] {
    return this.validators.split('|').map(v => ValidatorFactory.createValidator(v as ValidatorName));
  }

  @Emit()
  // tslint:disable-next-line: no-empty
  input(value: any): void {}

  @Emit()
  // tslint:disable-next-line: no-empty
  blur(value: FocusEvent): void {}
}
</script>


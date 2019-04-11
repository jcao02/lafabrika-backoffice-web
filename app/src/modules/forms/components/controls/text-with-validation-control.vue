<template>
  <SingleValueValidator :validators="validatorObjects" :errorsDictionary="errorsDictionary" v-slot="{ error, errorMessages }">
    <TextControl
      :value="value"
      :error="error"
      :errorMessages="errorMessages"
      v-on="$listeners"
    />
  </SingleValueValidator>
</template>

<script lang="ts">
import { Prop, Vue, Component } from 'vue-property-decorator';
import { AbstractValidator } from '../../classes/validators/abstract-validator';
import { ValidatorFactory } from '../../classes/factories/validator-factory';
import { defaultDictionary } from '../../classes/error-messages/default-error-messages';
import { ValidatorName } from '../../classes/validators/validator-names';

import SingleValueValidator from '../validators/single-value-validator.vue';
import TextControl from './text-control.vue';

@Component({
  components: {
    SingleValueValidator,
    TextControl
  }
})
export default class TextWithValidationControl extends Vue {
  @Prop() value: any;
  @Prop() validators!: string;
  errorsDictionary = defaultDictionary;

  get validatorObjects(): AbstractValidator[] {
    return this.validators.split('|').map(v => ValidatorFactory.createValidator(v as ValidatorName));
  }
}
</script>


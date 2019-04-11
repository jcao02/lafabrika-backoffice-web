<template>
  <FormWithValidation v-slot="{ valid }">
    <TextWithValidationControl validators="required"/>
    <TextWithValidationControl validators="required"/>
    <v-btn :disabled="!valid" color="info" type="submit">Entrar</v-btn>
  </FormWithValidation>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FormWithValidation from '../../forms/components/forms/form-with-validation.vue';
import TextWithValidationControl from '../../forms/components/controls/text-with-validation-control.vue';

@Component({
  components: {
    FormWithValidation,
    TextWithValidationControl
  },
})
export default class AuthenticationForm extends Vue {}
</script>

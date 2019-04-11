<template>
  <FormWithValidation>
    <TextWithValidationControl validators="required"/>
    <TextWithValidationControl validators="required"/>
    <v-btn color="info" type="submit">Entrar</v-btn>
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

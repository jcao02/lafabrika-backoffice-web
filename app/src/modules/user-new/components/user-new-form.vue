<template>
  <FormWithValidation ref="form" @submit.prevent="onSubmit" v-slot="{ valid }">
    <v-alert :value="generalError" type="error">{{ generalErrorMsg }}</v-alert>
    <TextWithValidationControl validators="required" type="email" v-model="form.email" label="Correo electrónico"/>
    <TextWithValidationControl validators="required" type="password" v-model="form.password" label="Contraseña"/>
    <v-btn class="submit-btn" :disabled="!valid" type="submit" color="primary">Enviar</v-btn>
  </FormWithValidation>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { FormWithValidation, TextWithValidationControl } from '@/modules/forms';

@Component({
  components: {
    FormWithValidation,
    TextWithValidationControl
  }
})
export default class UserNewForm extends Vue {
  form = {
    email: '',
    password: ''
  };

  generalError = false;
  generalErrorMsg = '';
}
</script>

<style scoped>
.submit-btn {
  width: 100%;
  margin: 16px 0 0 0;
}
</style>

<template>
  <FormWithValidation ref="form" @submit.prevent="onSubmit" v-slot="{ valid }">
    <v-alert :value="generalError" type="error">{{ generalErrorMsg }}</v-alert>
    <TextWithValidationControl validators="required|email" type="email" v-model="form.email" label="Correo electrónico"/>
    <TextWithValidationControl validators="required|min-length:8" type="password" v-model="form.password" label="Contraseña"/>
    <!-- TODO: This should have a wrapper component -->
    <v-radio-group v-model="form.role" label="Rol">
      <v-radio v-for="role in roles" :key="role" :value="role" :label="role"></v-radio>
    </v-radio-group>
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
  roles = [ 'user', 'admin' ];
  form = {
    email: '',
    password: '',
    role: this.roles[0]
  };

  generalError = false;
  generalErrorMsg = '';

  async onSubmit() {
    const form = this.$refs.form as FormWithValidation;
    const valid = form.validate();
    if (valid) {
      const { email, password } = this.form;
      try {
      } catch (err) {
        const { response } = err;
        const errorMsg = response.status === 401
          ? 'Combinación usuario/contraseña incorrecta'
          : `Hubo un error en el servidor (${response.status})`;

        this.setError(errorMsg);
      }
    }
  }

  /**
   * Sets a general error with message
   */
  private setError(msg: string) {
    this.generalError = true;
    this.generalErrorMsg = msg;
  }
}
</script>

<style scoped>
.submit-btn {
  width: 100%;
  margin: 16px 0 0 0;
}
</style>

<template>
  <FormWithValidation @submit.prevent="onSubmit" v-slot="{ valid }">
    <TextWithValidationControl validators="required" type="email" v-model="form.email" label="Correo electrónico"/>
    <TextWithValidationControl validators="required" type="password" v-model="form.password" label="Contraseña"/>
    <v-btn :disabled="!valid" color="info" type="submit">Entrar</v-btn>
  </FormWithValidation>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';

// Helper classes
import { AuthenticationPayload } from '../classes/authentication-payload';
import { NetworkRequester } from '../../shared/classes/http/network-requester';

// Mixins
import { TokenAuthenticationManager } from '../mixins/token-authentication-manager';

// Components
import FormWithValidation from '../../forms/components/forms/form-with-validation.vue';
import TextWithValidationControl from '../../forms/components/controls/text-with-validation-control.vue';

@Component({
  components: {
    FormWithValidation,
    TextWithValidationControl
  }
})
export default class AuthenticationForm extends mixins(TokenAuthenticationManager) {
  form: AuthenticationPayload = {
    email: '',
    password: ''
  };

  async onSubmit(event: Event) {
    const { email, password } = this.form;
    const res = await this.authenticate(this.form, { baseURL: process.env.VUE_APP_AUTH_BASE_URL });

    // Do something with res
  }
}
</script>

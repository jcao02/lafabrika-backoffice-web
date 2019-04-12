<template>
  <FormWithValidation @submit.prevent="onSubmit" v-slot="{ valid }">
    <v-alert :value="generalError" type="error">{{ generalErrorMsg }}</v-alert>
    <TextWithValidationControl validators="required" type="email" v-model="form.email" label="Correo electrónico"/>
    <TextWithValidationControl validators="required" type="password" v-model="form.password" label="Contraseña"/>
    <v-btn :disabled="!valid" color="info" type="submit">Entrar</v-btn>
  </FormWithValidation>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Mutation } from 'vuex-class';

// Helper classes
import { AuthenticationPayload } from '../classes/authentication-payload';
import { NetworkRequester } from '../../shared/classes/http/network-requester';

// Mixins
import { TokenAuthenticationManager } from '../mixins/token-authentication-manager';
import { TokenManager } from '../mixins/token-manager';

// Components
import FormWithValidation from '../../forms/components/forms/form-with-validation.vue';
import TextWithValidationControl from '../../forms/components/controls/text-with-validation-control.vue';

// Mutations
import { SET_CURRENT_USER } from '../../store/ui-store/mutations';
import { ADD_USERS } from '../../store/data-store/mutations';

@Component({
  components: {
    FormWithValidation,
    TextWithValidationControl
  }
})
export default class AuthenticationForm extends mixins(TokenAuthenticationManager, TokenManager) {
  @Mutation(SET_CURRENT_USER) setCurrentUser: any;
  @Mutation(ADD_USERS) addUsers: any;
  form: AuthenticationPayload = {
    email: '',
    password: ''
  };

  generalError = false;
  generalErrorMsg = '';

  async onSubmit(event: Event) {
    const { email, password } = this.form;
    try {
      const res = await this.authenticate(this.form, { baseURL: process.env.VUE_APP_AUTH_BASE_URL });
      const { token } = res.data;
      const userOrNull = this.decode(token);
      if (userOrNull) {
        this.addUsers({ users: [userOrNull] });
        this.setCurrentUser({ userId: userOrNull.id });
      }
    } catch (err) {
      const { response } = err;
      this.generalError = true;
      this.generalErrorMsg = response.status === 401
        ? 'Combinación usuario/contraseña incorrecta'
        : `Hubo un error en el servidor (${response.status})`;
    }
  }
}
</script>

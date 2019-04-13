<template>
  <FormWithValidation @submit.prevent="onSubmit" v-slot="{ valid }">
    <v-alert :value="generalError" type="error">{{ generalErrorMsg }}</v-alert>
    <TextWithValidationControl validators="required" type="email" v-model="form.email" label="Correo electrónico"/>
    <TextWithValidationControl validators="required" type="password" v-model="form.password" label="Contraseña"/>
    <v-btn class="submit-btn" :disabled="!valid" type="submit" color="primary">Entrar</v-btn>
  </FormWithValidation>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Mutation } from 'vuex-class';

// Helper classes
import { AuthenticationPayload } from '../classes/authentication-payload';
import { NetworkRequester } from '../../shared/classes/http/network-requester';
import { User } from '@/modules/shared/classes/resources/user';

// Mixins
import { TokenAuthenticationManager } from '../mixins/token-authentication-manager';
import { TokenManager } from '../mixins/token-manager';

// Components
import FormWithValidation from '../../forms/components/forms/form-with-validation.vue';
import TextWithValidationControl from '../../forms/components/controls/text-with-validation-control.vue';

// Mutations
import { SET_CURRENT_USER, SetCurrentUserPayload } from '../../store/ui-store/mutations';
import { ADD_USERS, AddUsersPayload } from '../../store/data-store/mutations';

@Component({
  components: {
    FormWithValidation,
    TextWithValidationControl
  }
})
export default class AuthenticationForm extends mixins(TokenAuthenticationManager, TokenManager) {
  @Mutation(SET_CURRENT_USER) setCurrentUser!: (payload: SetCurrentUserPayload) => void;
  @Mutation(ADD_USERS) addUsers!: (payload: AddUsersPayload) => void;

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
        this.handleUser(userOrNull);
        this.persistToken(token);
        this.$router.push({ path: '/' });
      } else {
        const errorMsg = 'Algo inesperado ocurrió, vuelve a intentar más tarde';
        this.setError(errorMsg);
      }
    } catch (err) {
      const { response } = err;
      const errorMsg = response.status === 401
        ? 'Combinación usuario/contraseña incorrecta'
        : `Hubo un error en el servidor (${response.status})`;

      this.setError(errorMsg);
    }
  }

  /**
   * Sets a general error with message
   */
  private setError(msg: string) {
    this.generalError = true;
    this.generalErrorMsg = msg;
  }

  /**
   * Stores the user
   */
  private handleUser(user: User) {
    this.addUsers({ users: [user] });
    this.setCurrentUser({ userId: user.id });
  }

}
</script>

<style scoped>
.submit-btn {
  width: 100%;
  margin: 16px 0 0 0;
}
</style>

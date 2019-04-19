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
import Component, { mixins } from 'vue-class-component';

import { UserNewManager } from '../mixins';
import { FormWithValidation, TextWithValidationControl } from '@/modules/forms';
import { Mutation } from 'vuex-class';
import { ADD_USERS, AddUsersPayload } from '@/modules/store/data-store/mutations';

@Component({
  components: {
    FormWithValidation,
    TextWithValidationControl
  }
})
export default class UserNewForm extends mixins(UserNewManager) {
  @Mutation(ADD_USERS) addUsers!: (payload: AddUsersPayload) => void;
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
      try {
        const res = await this.createUser(this.form, { baseURL: process.env.VUE_APP_USERS_BASE_URL });
        const user = res.data;
        this.addUsers({ users: [user] });
        this.$toast.success('Usuario creado exitosamente');
        this.$router.push('/admin');
      } catch (err) {
        const { response } = err;
        const errorMsg = response.status === 409
          ? 'El correo ya está registrado'
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

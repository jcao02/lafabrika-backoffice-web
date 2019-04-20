<template>
  <FormWithValidation ref="form" @submit.prevent="onSubmit" v-slot="{ valid }">
    <v-alert :value="generalError" type="error">{{ generalErrorMsg }}</v-alert>
    <TextWithValidationControl validators="required|email" type="email" v-model="form.email" label="Correo electrónico"/>
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
import { Prop, Watch } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';

import { UserEditManager } from '../mixins';

import { FormWithValidation, TextWithValidationControl } from '@/modules/forms';
import { User } from '@/modules/shared/classes/resources/user';
import { ADD_USERS, AddUsersPayload } from '@/modules/store/data-store/mutations';

@Component({
  components: {
    FormWithValidation,
    TextWithValidationControl
  }
})
export default class UserEditForm extends mixins(UserEditManager) {
  @Prop() user!: User | null;
  @Mutation(ADD_USERS) addUsers!: (payload: AddUsersPayload) => void;
  roles = [ 'user', 'admin' ];
  form = {
    email: '',
    role: this.roles[0]
  };

  generalError = false;
  generalErrorMsg = '';

  @Watch('user')
  onUserChange(val: User | null) {
    if (val !== null) {
      const { email, role } = val;
      this.form = { email, role };
    }
  }

  async onSubmit() {
    const form = this.$refs.form as FormWithValidation;
    const valid = form.validate();
    if (valid && this.user !== null) {
      try {
        const { email, role } = this.form;
        const res = await this.updateUser(
          this.user.id,
          { email, role },
          { baseURL: process.env.VUE_APP_USERS_BASE_URL }
        );
        const user = res.data;
        this.addUsers({ users: [user] });
        this.$toast.success('Usuario actualizado exitosamente');
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

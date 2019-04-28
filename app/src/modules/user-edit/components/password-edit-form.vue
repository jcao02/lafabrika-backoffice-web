<template>
  <FormWithValidation ref="form" @submit.prevent="onSubmit" v-slot="{ valid }">
    <v-alert :value="generalError" type="error">{{ generalErrorMsg }}</v-alert>
    <TextWithValidationControl validators="required" type="password" v-model="form.currentPassword" label="Contraseña Actual"/>
    <TextWithValidationControl validators="required|min-length:8" type="password" v-model="form.newPassword" label="Contraseña Nueva"/>
    <v-btn class="submit-btn" :disabled="!valid" type="submit" color="primary">Enviar</v-btn>
  </FormWithValidation>
</template>

<script lang="ts">
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';
import { User } from 'lafabrika-resources';

import { UserEditManager } from '../mixins';

import { FormWithValidation, TextWithValidationControl } from '@/modules/forms';
import { ADD_USERS, AddUsersPayload } from '@/modules/store/data-store/mutations';

@Component({
  components: {
    FormWithValidation,
    TextWithValidationControl
  }
})
export default class PasswordEditForm extends mixins(UserEditManager) {
  @Prop() user!: User | null;
  form = {
    currentPassword: '',
    newPassword: '',
  };

  generalError = false;
  generalErrorMsg = '';

  async onSubmit() {
    const form = this.$refs.form as FormWithValidation;
    const valid = form.validate();
    if (valid && this.user !== null) {
      try {
        const res = await this.updatePassword(
          this.user.id,
          this.form,
          { baseURL: process.env.VUE_APP_USERS_BASE_URL }
        );
        const user = res.data;
        this.$toast.success('Contraseña actualizada exitosamente');
      } catch (err) {
        const { response } = err;
        const errorMsg = `Hubo un error en el servidor (${response.status})`;

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

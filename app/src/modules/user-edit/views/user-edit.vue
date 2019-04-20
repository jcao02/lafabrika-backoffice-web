<template>
  <v-container>
    <v-layout column justify-center align-center align-content-center>
      <!-- Card containing form -->
      <v-card class="card" width="400">
        <!-- Center card content -->
        <v-layout column align-center fill-height>
          <v-img width="100%" :src="require('@/assets/guernica.jpg')"></v-img>
          <!-- Card title -->
          <v-card-title primary-title>
            <h1>Editar Usuario</h1>
          </v-card-title>
          <!-- Form -->
          <v-card-text class="form-container">
            <UserEditForm :user="user"/>
          </v-card-text>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import { UserEditForm } from '../components';
import { UserShowManager } from '../classes';
import { Route, RawLocation } from 'vue-router';
import { User } from '@/modules/shared/classes/resources/user';

@Component({
  components: {
    UserEditForm
  }
})
export default class UserEdit extends Vue {
  user: User | null = null;

  async beforeRouteEnter(
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: UserEdit) => any) | void) => void) {

    const { id } = to.params;
    try {
      const res = await UserShowManager.getUser(id);
      const user = res.data;
      next(vm => vm.setUser(user));
    } catch (err) {
      let msg = 'Error obteniendo el usuario';

      if ('response' in err) {
        const response = err.response;
        msg = response.statusCode === 404 ? 'Usuario no existe' : msg;
      }

      next(vm => vm.$toast.error(msg));
    }
  }

  setUser(user: User) {
    this.user = user;
  }
}
</script>

<style scoped>
.card {
  margin-top: 32px;
  padding-bottom: 32px;
}
.form-container {
  padding: 0 32px;
}
</style>

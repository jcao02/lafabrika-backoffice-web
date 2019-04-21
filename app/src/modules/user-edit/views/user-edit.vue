<template>
  <div class="user-edit">
    <v-btn class="back-btn" fab flat color="primary" to="/admin">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-container>
      <v-layout column justify-center align-content-center>
        <v-btn fab flat color="primary" to="/admin">
          <v-icon>arrow_back</v-icon>
        </v-btn>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import { User } from 'lafabrika-resources';

import { UserEditForm } from '../components';
import { UserShowManager } from '../classes';
import { Route, RawLocation } from 'vue-router';

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
      const res = await UserShowManager.getUser(id, { baseURL: process.env.VUE_APP_USERS_BASE_URL });
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
.back-btn {
  margin: 16px 0 0 16px;
}
.card {
  padding-bottom: 32px;
  align-self: center;
}
.form-container {
  padding: 0 32px;
}
</style>

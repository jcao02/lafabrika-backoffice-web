<template>
  <div class="user-edit">
    <v-layout class="inner-navigation" row align-center>
      <v-btn class="back-btn" fab flat color="primary" to="/admin">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-tabs class="navigation-tabs" v-model="activeTab">
        <v-tab key="basic">Información Básica</v-tab>
        <v-tab key="password">Cambiar Contraseña</v-tab>
      </v-tabs>
    </v-layout>
    <v-container>
      <v-layout column justify-center align-content-center>
        <!-- Card containing form -->
        <v-card class="card" width="400">
          <!-- Center card content -->
          <v-layout column align-center fill-height>
            <v-img width="100%" :src="require('@/assets/guernica.jpg')"></v-img>
            <!-- Card title -->
            <v-card-title primary-title>
              <h1>{{ formTitle }}</h1>
            </v-card-title>
            <!-- Form -->
            <v-card-text class="form-container">
              <keep-alive>
                <component :is="currentFormComponent" v-bind="currentFormProps"></component>
              </keep-alive>
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

import { UserEditForm, PasswordEditForm } from '../components';
import { UserShowManager } from '../classes';
import { Route, RawLocation } from 'vue-router';

enum FormTab {
  BASIC = 0,
  PASSWORD = 1
}

@Component({
  components: {
    UserEditForm
  }
})
export default class UserEdit extends Vue {
  user: User | null = null;
  activeTab: FormTab = FormTab.BASIC;

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

  get formTitle() {
    switch (this.activeTab) {
      case FormTab.PASSWORD:
        return 'Cambiar Contraseña';
      case FormTab.BASIC:
      default:
        return 'Editar Usuario';
    }
  }

  get currentFormComponent() {
    switch (this.activeTab) {
      case FormTab.PASSWORD:
        return PasswordEditForm;
      case FormTab.BASIC:
      default:
        return UserEditForm;
    }
  }

  get currentFormProps() {
    return { user: this.user };
  }
}
</script>

<style scoped>
.inner-navigation {
  margin: 16px 0 0 16px;
}
.navigation-tabs {
  margin-left: 16px;
}
.card {
  padding-bottom: 32px;
  align-self: center;
}
.form-container {
  padding: 0 32px;
}
</style>

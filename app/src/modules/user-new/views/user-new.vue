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
            <h1>Nuevo Usuario</h1>
          </v-card-title>
          <!-- Form -->
          <v-card-text class="form-container">
            <UserNewForm />
          </v-card-text>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { UserNewForm } from '../components';

@Component({
  components: {
    UserNewForm
  }
})
export default class UserNew extends Vue {}
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

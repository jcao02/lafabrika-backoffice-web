<template>
  <div class="user-new">
    <!-- Back button -->
    <v-btn class="back-btn" fab flat color="primary" to="/admin">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-container>
      <v-layout column justify-center align-content-center>

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
  </div>
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

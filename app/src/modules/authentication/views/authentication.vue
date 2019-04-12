<template>
<v-container>
  <v-layout column justify-center align-center align-content-center>
    <!-- Logo image -->
    <v-img class="logo" width="160" :src="require('@/assets/logo.png')"></v-img>
    <!-- Card containing form -->
    <v-card class="card" width="400">
      <!-- Center card content -->
      <v-layout column align-center fill-height>
        <v-img width="100%" :src="require('@/assets/sign-in.jpg')"></v-img>
        <!-- Card title -->
        <v-card-title primary-title>
          <h1>Iniciar Sesión</h1>
        </v-card-title>
        <!-- Form -->
        <v-card-text class="form-container">
          <AuthenticationForm />
        </v-card-text>
      </v-layout>
    </v-card>
  </v-layout>
</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AuthenticationForm from '../components/authentication-form.vue';

@Component({
  components: {
    AuthenticationForm
  }
})
export default class Authentication extends Vue {}
</script>

<style scoped>
.card {
  margin-top: 32px;
  padding-bottom: 32px;
}
.form-container {
  padding: 0 32px;
}
.logo {
  margin-top: 24px;
}
</style>

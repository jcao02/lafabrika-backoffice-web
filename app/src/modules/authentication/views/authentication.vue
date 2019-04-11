<template>
<v-container>
  <v-layout column justify-center align-center>
    <!-- Logo image -->
    <v-img width="160" :src="require('@/assets/logo.png')"></v-img>
    <!-- Card containing form -->
    <v-card width="320">
      <!-- Center card content -->
      <v-layout column justify-center align-center>
        <!-- Card title -->
        <v-card-title primary-title>
          <h1>Iniciar Sesión</h1>
        </v-card-title>
        <!-- Form -->
        <AuthenticationForm />
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




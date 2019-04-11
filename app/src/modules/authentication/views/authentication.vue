<template>
<v-container>
  <v-layout row justify-center>
    <v-flex xs4>
      <!-- Card containing form -->
      <v-card>
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
    </v-flex>
  </v-layout>
</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AuthenticationForm from '../components/authentication-form.vue';

@Component({
  components: {
    AuthenticationForm
  },
})
export default class Authentication extends Vue {}
</script>




<template>
<div class="dashboard-contai">
  <v-toolbar>
    <v-toolbar-title> La Fábrika </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat>Salir</v-btn>
    </v-toolbar-items>
  </v-toolbar>

  <!-- Children routes -->
  <router-view/>
</div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class Backoffice extends Vue {}

</script>


<template>
  <v-toolbar>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn @click="signOut" flat>Salir</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Emit } from 'vue-property-decorator';

@Component
export default class ToolBar extends Vue {
  @Emit()
  // tslint:disable-next-line: no-empty
  signOut() {}
}
</script>
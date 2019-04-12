<template>
<div class="dashboard-contai">
  <v-toolbar>
    <v-toolbar-title> La Fábrika </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn @click="onSignOut" flat>Salir</v-btn>
    </v-toolbar-items>
  </v-toolbar>

  <!-- Children routes -->
  <router-view/>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import { Mutation } from 'vuex-class';
import { TokenManager } from '@/modules/authentication/mixins/token-manager';
import { SET_CURRENT_USER, SetCurrentUserPayload } from '@/modules/store/ui-store/mutations';

@Component
export default class Backoffice extends mixins(TokenManager) {
  @Mutation(SET_CURRENT_USER) setCurrentUser!: (payload: SetCurrentUserPayload) => void;

  /**
   * Signs out the current user
   */
  onSignOut() {
    this.setCurrentUser({ userId: null });
    this.removeToken();
    this.$router.push('/auth');
  }
}

</script>


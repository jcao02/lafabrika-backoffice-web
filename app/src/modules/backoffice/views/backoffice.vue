<template>
<div class="dashboard-contai">
  <v-toolbar>
    <v-toolbar-title> La Fábrika </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="isAdmin()" to="/admin" flat>Panel Administración</v-btn>
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
import { Mutation, Getter } from 'vuex-class';

// Mixins
import { CurrentUserManager } from '@/modules/shared/classes/state/current-user-manager';
import { TokenManager } from '@/modules/authentication/mixins/token-manager';

// Store Mutarions
import { SET_CURRENT_USER, SetCurrentUserPayload } from '@/modules/store/ui-store/mutations';

// Helper classes
import { User } from '@/modules/shared/classes/resources/user';

@Component
export default class Backoffice extends mixins(TokenManager, CurrentUserManager) {
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


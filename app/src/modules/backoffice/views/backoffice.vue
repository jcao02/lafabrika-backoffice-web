<template>
<div class="dashboard-container">
  <ToolBar @sign-out="onSignOut"/>
  <v-layout row>
    <v-flex fill-height class="nav-drawer-container">
      <NavigationDrawer class="nav-drawer" :isAdmin="isAdmin()"/>
    </v-flex>
    <!-- Children routes -->
    <router-view/>
  </v-layout>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import { Mutation, Getter } from 'vuex-class';
import { User } from 'lafabrika-resources';

import { NavigationDrawer, ToolBar } from '../components';

// Mixins
import { CurrentUserManagerMixin } from '@/modules/shared/classes/state/current-user-manager-mixin';
import { TokenManager } from '@/modules/authentication/mixins/token-manager';

// Store Mutarions
import { SET_CURRENT_USER, SetCurrentUserPayload } from '@/modules/store/ui-store/mutations';


@Component({
  components: {
    NavigationDrawer,
    ToolBar
  }
})
export default class Backoffice extends mixins(TokenManager, CurrentUserManagerMixin) {
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


<style>
.nav-drawer-container {
  max-width: 300px;
}
</style>

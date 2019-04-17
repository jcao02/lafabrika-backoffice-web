import Vue from 'vue';
import Component from 'vue-class-component';
import store from '@/modules/store';

/**
 * Class to manage everything related to the current user.
 */
@Component
export class CurrentUserManager extends Vue {
  isSignedIn(): boolean {
    return !!store.getters.getCurrentUser;
  }

  isAdmin(): boolean {
    return this.isSignedIn() && store.getters.getCurrentUser.role === 'admin';
  }
}

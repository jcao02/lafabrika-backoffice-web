import Vue from 'vue';
import Component from 'vue-class-component';
import { CurrentUserManager } from './current-user-manager';

/**
 * Class to manage everything related to the current user.
 */
@Component
export class CurrentUserManagerMixin extends Vue {
  isSignedIn(): boolean {
    return CurrentUserManager.isSignedIn();
  }

  isAdmin(): boolean {
    return CurrentUserManager.isAdmin();
  }
}

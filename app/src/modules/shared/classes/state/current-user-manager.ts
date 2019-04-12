import store from '@/modules/store';

/**
 * Class to manage everything related to the current user.
 */
export class CurrentUserManager {
  isSignedIn(): boolean {
    return !!store.getters.getCurrentUser;
  }
}

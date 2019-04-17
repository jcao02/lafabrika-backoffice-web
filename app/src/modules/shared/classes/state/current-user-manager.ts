import store from '@/modules/store';

/**
 * Class to manage everything related to the current user.
 */
export class CurrentUserManager {
  static isSignedIn(): boolean {
    return !!store.getters.getCurrentUser;
  }

  static isAdmin(): boolean {
    return CurrentUserManager.isSignedIn() && store.getters.getCurrentUser.role === 'admin';
  }
}

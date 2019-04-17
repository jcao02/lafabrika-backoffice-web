import { NavigationGuard } from 'vue-router';
import { CurrentUserManager } from '@/modules/shared/classes/state/current-user-manager';

/**
 * Guard to stop navigation if the user is signed-in
 */
export const notSignedIn: NavigationGuard = (to, from, next) => {
  if (CurrentUserManager.isSignedIn()) {
    next(false);
  } else  {
    next();
  }
};

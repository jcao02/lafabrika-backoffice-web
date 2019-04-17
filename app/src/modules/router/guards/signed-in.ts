import { NavigationGuard } from 'vue-router';
import { CurrentUserManager } from '@/modules/shared/classes/state/current-user-manager';

/**
 * Guard to stop navigation if the user is signed-in
 */
export const signedIn: NavigationGuard = (to, from, next) => {
  if (to.meta.requiresNotAuth || CurrentUserManager.isSignedIn()) {
    next();
  } else  {
    next('/auth');
  }
};

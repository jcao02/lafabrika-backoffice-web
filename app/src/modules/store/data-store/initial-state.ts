import { User } from 'lafabrika-resources';

import { TokenManager } from '@/modules/authentication/mixins/token-manager';
import { DataState } from './state';

/**
 * Gets the initial state
 */
function getInitialState(): DataState {
  let user: User | null;

  const tokenManager = new TokenManager();
  const tokenOrNull = tokenManager.getToken();
  if (tokenOrNull) {
    user = tokenManager.decode(tokenOrNull);
  } else {
    user = null;
  }

  return { users: !!user ? { [user.id]: user } : {} };
}

export const dataState: DataState = getInitialState();

import { UIState } from './state';
import { TokenManager } from '@/modules/authentication/mixins/token-manager';

/**
 * Gets the initial state
 */
function getInitialState(): UIState {
  let currentUser: string | null;

  const tokenManager = new TokenManager();
  const tokenOrNull = tokenManager.getToken();
  if (tokenOrNull) {
    const userOrNull = tokenManager.decode(tokenOrNull);
    currentUser = !!userOrNull ? userOrNull.id : null;
  } else {
    currentUser = null;
  }

  return { currentUser };
}

export const uiState: UIState = getInitialState();

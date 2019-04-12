import { UIState } from './state';
import { RootState } from '../state';
import { User } from '@/modules/shared/classes/resources/user';

export function getCurrentUser(state: UIState, getters: any, rootState: RootState, rootGetters: any): User | null {
  const idOrNull = state.currentUser;
  if (idOrNull) {
    return rootGetters.getUserById(idOrNull);
  } else {
    return null;
  }
}

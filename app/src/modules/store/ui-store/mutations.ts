import { UIState } from './state';

export const SET_CURRENT_USER = '[UI Store] Set Current User';
export interface SetCurrentUserPayload {
  userId: string | null;
}
export function setCurrentUser(state: UIState, payload: SetCurrentUserPayload) {
  state.currentUser = payload.userId;
}

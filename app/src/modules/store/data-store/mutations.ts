import { User } from '@/modules/shared/classes/resources/user';
import { DataState } from './state';

export const ADD_USERS = '[Data Store] Add Users';
export interface AddUsersPayload {
  users: User[];
}
export function addUsers(state: DataState, payload: AddUsersPayload) {
  const { users } = payload;

  const usersState: typeof state.users = {};
  users.forEach(u => { usersState[u.id] = u; });

  state.users = { ...state.users, ...usersState };
}

export const DELETE_USER = '[Data Store] Delete User';
export interface DeleteUsersPayload {
  userId: string;
}
export function deleteUser(state: DataState, payload: DeleteUsersPayload) {
  const { userId } = payload;

  const usersState = { ...state.users };
  if (userId in usersState) {
    delete usersState[userId];
    state.users = usersState;
  }
}

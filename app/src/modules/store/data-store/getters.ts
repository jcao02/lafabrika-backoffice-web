import { User } from 'lafabrika-resources';
import { DataState } from './state';

export function getUserById(state: DataState): (id: string) => User | null {
  return (id) => state.users[id] ? state.users[id] : null;
}

export function getAllUsers(state: DataState): User[] {
  return Object.values(state.users);
}

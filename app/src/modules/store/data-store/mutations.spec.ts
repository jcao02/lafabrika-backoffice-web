import { expect } from 'chai';
import { addUsers, deleteUser } from './mutations';
import { dataState } from './initial-state';

describe('DataStore Mutations', () => {
  describe('ADD_USERS', () => {
    it('should add a user to state', () => {
      const user = { id: '1', email: 'jon@example.com', role: 'admin' };
      const state = { ...dataState };
      const expected = { users: { [user.id]: user } };
      addUsers(state, { users: [user] });
      expect(state).to.eql(expected);
    });
    it('should add multiple users to state', () => {
      const user1 = { id: '1', email: 'jon@example.com', role: 'user' };
      const user2 = { id: '2', email: 'foo@example.com', role: 'user' };
      const state = { ...dataState };
      const expected = { users: { [user1.id]: user1, [user2.id]: user2 } };
      addUsers(state, { users: [user1, user2] });
      expect(state).to.eql(expected);
    });
  });
  describe('DELETE_USER', () => {
    it('should delete an existing user', () => {
      const user1 = { id: '1', email: 'jon@example.com', role: 'admin' };
      const user2 = { id: '2', email: 'foo@example.com', role: 'user' };
      const state = { users: { [user1.id]: user1, [user2.id]: user2 } };
      deleteUser(state, { userId: user1.id });
      const expected = { users: { [user2.id]: user2 } };
      expect(state).to.eql(expected);
    });
    it('should noop when user does not exist', () => {
      const unexistent = '3';
      const user1 = { id: '1', email: 'jon@example.com', role: 'admin' };
      const user2 = { id: '2', email: 'foo@example.com', role: 'user' };
      const state = { users: { [user1.id]: user1, [user2.id]: user2 } };
      deleteUser(state, { userId: unexistent });
      const expected = state;
      expect(state).to.eql(expected);
    });
  });
});

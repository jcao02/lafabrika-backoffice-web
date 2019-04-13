import { expect } from 'chai';
import { addUsers } from './mutations';
import { dataState } from './initial-state';

describe('DataStore Mutations', () => {
  describe('ADD_USERS', () => {
    it('should add a user to state', () => {
      const user = { id: '1', email: 'jon@example.com' };
      const state = { ...dataState };
      const expected = { users: { [user.id]: user } };
      addUsers(state, { users: [user] });
      expect(state).to.eql(expected);
    });
    it('should add multiple users to state', () => {
      const user1 = { id: '1', email: 'jon@example.com' };
      const user2 = { id: '2', email: 'foo@example.com' };
      const state = { ...dataState };
      const expected = { users: { [user1.id]: user1, [user2.id]: user2 } };
      addUsers(state, { users: [user1, user2] });
      expect(state).to.eql(expected);
    });
  });
});

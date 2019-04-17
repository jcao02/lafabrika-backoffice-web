import { expect } from 'chai';
import { User } from '@/modules/shared/classes/resources/user';
import { UIState } from './state';
import { getCurrentUser } from './getters';

describe('UIStore Getters', () => {
  describe('getCurrentUser', () => {
    it('should get the current user', () => {
      const user: User = { id: '1', email: 'jon@example.com', role: 'admin' };
      const state: UIState = { currentUser: user.id };
      const getUserById = () => user;

      const expected = user;
      expect(getCurrentUser(state, {}, {}, { getUserById })).to.eql(expected);
    });
    it('should get null if the current user is null', () => {
      const user: User = { id: '1', email: 'jon@example.com', role: 'admin' };
      const state: UIState = { currentUser: null };
      const getUserById = () => user;

      const expected = null;
      expect(getCurrentUser(state, {}, {}, { getUserById })).to.eql(expected);
    });
    it('should get null if the data store does not contain the user id', () => {
      const state: UIState = { currentUser: '1' };
      const getUserById = () => null;

      const expected = null;
      expect(getCurrentUser(state, {}, {}, { getUserById })).to.eql(expected);
    });
  });
});

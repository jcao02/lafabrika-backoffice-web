import { expect } from 'chai';
import { uiState } from './initial-state';
import { setCurrentUser } from './mutations';

describe('UIStore Mutations', () => {
  describe('SET_CURRENT_USER', () => {
    it('should set the current user to id', () => {
      const state = { ...uiState };

      const userId = '1';
      const payload = { userId };
      setCurrentUser(state, payload);

      const expected = { currentUser: userId };
      expect(state).to.eql(expected);
    });
    it('should set the current user to null', () => {
      const state = { ...uiState };

      const userId = null;
      const payload = { userId };
      setCurrentUser(state, payload);

      const expected = { currentUser: userId };
      expect(state).to.eql(expected);
    });
  });
});

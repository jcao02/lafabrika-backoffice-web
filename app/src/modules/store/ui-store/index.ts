import { Module } from 'vuex';
import { UIState } from './state';
import { RootState } from '../state';
import { SET_CURRENT_USER, setCurrentUser } from './mutations';
import { getCurrentUser } from './getters';
import { uiState } from './initial-state';

export const uiStore: Module<UIState, RootState> = {
  state: uiState,
  mutations: {
    [SET_CURRENT_USER]: setCurrentUser
  },
  getters: { getCurrentUser }
};

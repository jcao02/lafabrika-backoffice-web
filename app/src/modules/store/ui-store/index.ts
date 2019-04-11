import { Module } from 'vuex';
import { UIState } from './state';
import { RootState } from '../state';
import { SET_CURRENT_USER, setCurrentUser } from './mutations';
import { getCurrentUser } from './getters';

export const state: UIState = {
  currentUser: null
};

export const uiStore: Module<UIState, RootState> = {
  state,
  mutations: {
    [SET_CURRENT_USER]: setCurrentUser
  },
  getters: { getCurrentUser }
};

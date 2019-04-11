import { Module } from 'vuex';
import { DataState } from './state';
import { RootState } from '../state';
import { ADD_USERS, addUsers } from './mutations';

export const state: DataState = {
  users: {}
};

export const dataStore: Module<DataState, RootState> = {
  state,
  mutations: {
    [ADD_USERS]: addUsers
  }
};

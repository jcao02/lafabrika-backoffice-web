import { Module } from 'vuex';
import { DataState } from './state';
import { RootState } from '../state';
import { ADD_USERS, addUsers } from './mutations';
import { getUserById } from './getters';
import { dataState } from './initial-state';


export const dataStore: Module<DataState, RootState> = {
  state: dataState,
  mutations: {
    [ADD_USERS]: addUsers
  },
  getters: {
    getUserById
  }
};

import { Module } from 'vuex';
import { DataState } from './state';
import { RootState } from '../state';
import { ADD_USERS, addUsers, DELETE_USER, deleteUser } from './mutations';
import { getUserById, getAllUsers } from './getters';
import { dataState } from './initial-state';


export const dataStore: Module<DataState, RootState> = {
  state: dataState,
  mutations: {
    [ADD_USERS]: addUsers,
    [DELETE_USER]: deleteUser
  },
  getters: {
    getUserById,
    getAllUsers
  }
};

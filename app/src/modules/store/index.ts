import Vue from 'vue';
import Vuex from 'vuex';

import { RootState } from './state';
import { uiStore } from './ui-store';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  modules: {
    uiStore
  }
});

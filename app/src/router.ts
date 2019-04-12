import Vue from 'vue';
import Router from 'vue-router';

import Authentication from './modules/authentication/views/authentication.vue';
import Home from './modules/home/views/home.vue';
import { CurrentUserManager } from './modules/shared/classes/state/current-user-manager';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/auth',
      name: 'authentication',
      component: Authentication,
      beforeEnter: (to, from, next) => {
        const cuManager = new CurrentUserManager();

        if (cuManager.isSignedIn()) {
          next(false);
        } else  {
          next();
        }
      }
    }
  ]
});

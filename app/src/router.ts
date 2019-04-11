import Vue from 'vue';
import Router from 'vue-router';

import Authentication from './modules/authentication/views/authentication.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth',
      name: 'authentication',
      component: Authentication
    }
  ]
});

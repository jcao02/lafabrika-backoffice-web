import Vue from 'vue';
import Router from 'vue-router';

import Authentication from '@/modules/authentication/views/authentication.vue';
import Home from '@/modules/home/views/home.vue';
import { notSignedIn, signedIn } from './guards';

Vue.use(Router);

const router = new Router({
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
      beforeEnter: notSignedIn,
      meta: { requiresNotAuth: true }
    }
  ]
});

// Global guards
router.beforeEach(signedIn);

export default router;

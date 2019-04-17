import Vue from 'vue';
import Router from 'vue-router';

import { Authentication } from '@/modules/authentication';
import { Backoffice } from '@/modules/backoffice';
import { notSignedIn, signedIn, isAdmin } from './guards';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'backoffice',
      component: Backoffice,
      children: [
        {
          path: '/admin',
          name: 'admin',
          component: () => import('@/modules/admin/views/admin.vue'),
          beforeEnter: isAdmin
        }
      ]
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

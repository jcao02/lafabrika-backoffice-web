import Vue from 'vue';
import Router from 'vue-router';

// Guards
import { notSignedIn, signedIn, isAdmin } from './guards';

// Eager components
import { Authentication } from '@/modules/authentication';
import { Backoffice } from '@/modules/backoffice';

// Lazy components
const Admin = () => import('@/modules/admin/views/admin.vue');
const UserList = () => import('@/modules/admin/views/user-list.vue');

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
          path: 'admin',
          beforeEnter: isAdmin,
          component: Admin,
          children: [
            {
              path: '',
              components: {
                default: UserList
              }
            }
          ]
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

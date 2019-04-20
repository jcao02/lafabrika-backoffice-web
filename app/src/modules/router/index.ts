import Vue from 'vue';
import Router from 'vue-router';
import Component from 'vue-class-component';

// Guards
import { notSignedIn, signedIn, isAdmin } from './guards';

// Eager components
import { Authentication } from '@/modules/authentication';
import { Backoffice } from '@/modules/backoffice';

// Lazy components
const Admin = () => import('@/modules/admin/views/admin.vue');
const UserAdminPanel = () => import('@/modules/user-admin-panel/views/user-admin-panel.vue');
const UserNew = () => import('@/modules/user-new/views/user-new.vue');
const UserEdit = () => import('@/modules/user-edit/views/user-edit.vue');

Vue.use(Router);

/** Register component hooks */
Component.registerHooks([
  'beforeRouteEnter'
]);


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
              component: UserAdminPanel
            },
            {
              path: 'users/new',
              component: UserNew
            },
            {
              path: 'users/edit/:id',
              component: UserEdit
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

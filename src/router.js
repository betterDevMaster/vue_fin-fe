import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import store from '@/store';

Vue.use(Router);

function checkAuth() {
  return (to, from, next) => {
    if (store.state.auth.isAuthenticated) {
      next();
    } else {
      next('/login');
    }
  };
}

function checkNotAuth() {
  return (to, from, next) => {
    if (!store.state.auth.isAuthenticated) {
      next();
    } else {
      next(from.fullPath);
    }
  };
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Layout,
      beforeEnter: checkAuth(),
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('@/views/Dashboard')
        },
        {
          path: '/settings',
          name: 'User settings',
          component: () => import('@/views/User/Settings')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      beforeEnter: checkNotAuth(),
      component: () => import('@/views/Auth/Login')
    },
    {
      path: '/pages/500',
      name: '500',
      beforeEnter: checkAuth(),
      component: () => import('@/views/Pages/500')
    },
    {
      path: '*',
      name: '404',
      beforeEnter: checkAuth(),
      component: () => import('@/views/Pages/404')
    }
  ]
});

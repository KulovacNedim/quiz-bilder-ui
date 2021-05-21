import { createRouter, createWebHistory } from 'vue-router';

import UserAuth from './pages/auth/UserAuth';
import SignInAndOut from './components/auth/SignInAndOut';
import ForgotPassword from './components/auth/ForgotPassword';
import TheWelcome from './pages/TheWelcome';

import store from './store/index';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: TheWelcome,
    },
    {
      path: '/auth',
      component: UserAuth,
      meta: { requiresUnauth: true },
      children: [
        {
          path: '/',
          component: SignInAndOut,
          name: 'signin',
        },
        {
          path: 'forgot-password',
          component: ForgotPassword,
          name: 'forgot-password',
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters['auth/isAuthenticated']) {
    next('/');
  } else {
    next();
  }
});

export default router;

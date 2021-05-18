import { createRouter, createWebHistory } from 'vue-router';

import UserAuth from './pages/auth/UserAuth';
import SignInAndOut from './components/auth/SignInAndOut';
import ForgotPassword from './components/auth/ForgotPassword';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auth',
      component: UserAuth,
      children: [
        { path: '', component: SignInAndOut, name: 'signin' },
        {
          path: 'forgot-password',
          component: ForgotPassword,
          name: 'forgot-password',
        },
      ],
    },
  ],
});

export default router;

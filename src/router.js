import { createRouter, createWebHistory } from 'vue-router';

import UserAuth from './pages/auth/UserAuth';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/auth', component: UserAuth }],
});

export default router;

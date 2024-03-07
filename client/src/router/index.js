import { createRouter, createWebHistory } from 'vue-router'
import admin from './admin.js';
import user from './user.js';


const routes = [
  admin,
  user
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // 라우터 이동시 스크롤 자동 상위
  scrollBehavior() {
    return { top: 0 }
  },
  routes
})

export default router

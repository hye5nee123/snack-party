import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProCard from '../components/ProductCard.vue' //상품기본컴포넌트


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/proCard',
    name: 'proCard',
    component: ProCard

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

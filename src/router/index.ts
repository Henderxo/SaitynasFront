import { createRouter, createWebHistory } from 'vue-router'
import DevelopersView from '@/views/DevelopersView.vue'
import GamesView from '@/views/GamesView.vue'
import UsersView from '@/views/UsersView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DevelopersView,
      alias: '/developers'
    },
    {
      path: '/games',
      name: 'games',
      component: GamesView,
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    }
  ],
})

export default router

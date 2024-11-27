import { createRouter, createWebHistory } from 'vue-router'
import DevelopersView from '@/views/DevelopersView.vue'
import GamesView from '@/views/GamesView.vue'
import UsersView from '@/views/UsersView.vue'
import LoginView from '@/views/LoginView.vue'
import DeveloperDetailsView from '@/views/detailViews/DeveloperDetailsView.vue'
import GameDetailsView from '@/views/detailViews/GameDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children: [
        {
            path: '',
            name: 'home',
            component: DevelopersView,
            alias: '/developers'
        },
        {
            path: '/developers/:id',
            name: 'developerDetails',
            component: DeveloperDetailsView,
            props: true
        }
      ]
      
    },
    {
      path: '/',
      children: [{
          path: 'games',
          name: 'games',
          component: GamesView,
      },
      {
          path: 'game/:id',
          name: 'gameDetails',
          component: GameDetailsView,
          props: true
      }
    
    ],
      
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

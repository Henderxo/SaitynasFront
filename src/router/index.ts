import { createRouter, createWebHistory } from 'vue-router'
import DevelopersView from '@/views/DevelopersView.vue'
import GamesView from '@/views/GamesView.vue'
import UsersView from '@/views/UsersView.vue'
import LoginView from '@/views/LoginView.vue'
import DeveloperDetailsView from '@/views/detailViews/DeveloperDetailsView.vue'
import GameDetailsView from '@/views/detailViews/GameDetailsView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { useAuthStore } from '@/stores/AuthStore'
import PageNotFound from '@/views/PageNotFound.vue'
import DevView from '@/views/DevView.vue'

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
          path: 'games/:id',
          name: 'gameDetails',
          component: GameDetailsView,
          props: true
      }
    
    ],},
    {
      path: '/users',
      name: 'users',
      component: UsersView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        hideNavbar: true
      },
      beforeEnter: (to, from) =>{
        if(useAuthStore().isUserLoggedIn()){
          return from
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        hideNavbar: true
      },
      beforeEnter: (to, from) =>{
        if(useAuthStore().isUserLoggedIn()){
          return from
        }
      }
    },
    {
      path: '/:pathMatch(.*)',
      name: 'pathNotFound',
      component: PageNotFound
    },
    {
      path: '/dev',
      name: 'dev',
      component: DevView
    },

  ],
})
router.beforeEach((to, from) => {
  if(useAuthStore().isUserLoggedIn()){
    if(useAuthStore().currentUser?.type === 'admin'){
      return true
    }
    if(to.path === '/dev' && useAuthStore().isDev())
    {
      return true
    }
    if(to.path !== '/users'){
      return true
    }
    return {name: 'pathNotFound'}
  } 
  if (
    to.path === '/login' || 
    to.path === '/' || 
    to.path === '/register' ||
    to.path === '/games' || 
    to.path.startsWith('/developers/') ||
    to.path.startsWith('/games/') ||
    to.name === 'pathNotFound'
  ) {
    return true; 
  }
  if (to.path === '/users' || to.path === '/dev') {
    return { path: '/login' }
  }
  return {name: 'pathNotFound'}
})

export default router

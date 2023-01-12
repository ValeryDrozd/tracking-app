import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomePage/HomeView.vue'
import CompaniesView from '@/pages/CompaniesPage/CompaniesView.vue'
import NewsView from '@/pages/NewsPage/NewsView.vue'
import LoginView from '@/pages/LoginPage/LoginView.vue'
import SignupView from '@/pages/SignupPage/SignupView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/companies',
    name: 'companies',
    component: CompaniesView
  },
  {
    path: '/news/:pSymbol/:pSearch/',
    name: 'NewsView',
    component: NewsView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

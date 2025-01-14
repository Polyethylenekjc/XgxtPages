import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from) => {
        console.log('路由守卫')
        const cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
          if (cookies[i].trim().startsWith('authToken=')) {
            console.log('已登录')
            return
          }
        }
        alert('请先登录')
        router.push({ name: 'login' })
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
})

export default router

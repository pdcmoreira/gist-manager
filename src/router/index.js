import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/gists',
      name: 'gists',
      component: () => import('@/views/GistsView.vue'),
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore()

        if (!userStore.isLoggedIn) {
          next({ name: 'home' })

          return
        }

        next()
      }
    },
    // Route declaration only, so that vue-router doesn't complain about missing route.
    // Handled by the authorization flow, which should navigate away from it.
    {
      path: '/authorize',
      name: 'authorize'
    }
  ]
})

export default router

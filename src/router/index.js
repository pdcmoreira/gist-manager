import { createRouter, createWebHistory } from 'vue-router'
import { authorization } from '@/router/guards/authorization'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        allowGuest: true
      }
    },
    {
      path: '/gists',
      name: 'gists',
      component: () => import('@/views/GistsView.vue'),
      props: (route) => route.query
    },
    {
      path: '/gists/new',
      name: 'gist-new',
      component: () => import('@/views/GistEditView.vue')
    },
    {
      path: '/gists/:id',
      name: 'gist-details',
      component: () => import('@/views/GistDetailsView.vue'),
      props: true
    },
    {
      path: '/gists/:id/edit',
      name: 'gist-edit',
      component: () => import('@/views/GistEditView.vue'),
      props: true
    },
    // Route declaration only, so that vue-router doesn't complain about missing route.
    // Handled by the authorization flow, which should navigate away from it.
    {
      path: '/authorize',
      name: 'authorize',
      meta: {
        allowGuest: true
      }
    }
  ]
})

router.beforeEach(authorization)

export default router

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
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore()

        if (!userStore.isLoggedIn) {
          next({ name: 'home' })

          return
        }

        next()
      },
      children: [
        {
          path: '',
          name: 'gists',
          component: () => import('@/views/GistsView.vue'),
          props: (route) => route.query
        },
        {
          path: ':id',
          name: 'gist-details',
          component: () => import('@/views/GistDetailsView.vue'),
          beforeEnter: (to, from, next) => {
            if (from.name === 'gists') {
              // Save the list query parameters into the target route's query, to build the "back
              // to list" link

              // Check if query was already saved, to prevent a loop
              const savedQuery =
                (!from.query.type && !from.query.visibility) ||
                to.query['list-type'] ||
                to.query['list-visibility']

              if (!savedQuery) {
                const { type, visibility } = from.query

                to.query = { ...to.query, 'list-type': type, 'list-visibility': visibility }

                next(to)

                return
              }
            }

            next()
          },
          props: (route) => ({ ...route.params, ...route.query })
        }
      ]
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
